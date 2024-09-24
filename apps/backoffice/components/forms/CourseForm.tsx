"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { AlertModal } from "../modal/alert-modal";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import FileUpload from "../FileUpload";

const formSchema = z.object({
  title: z.string().min(1, { message: "Judul harus di isi." }),
  activities: z.string().min(1, { message: "Pilih satu aktifitas" }),
  exam_quiz: z.string().min(1, { message: "Pilih satu quiz" }),
  duration: z.string(),
  is_open_exam: z.boolean().optional(),
  is_open_task: z.boolean().optional(),
  min_score: z.string().max(100, { message: "Maksimum nilai 100." }),
  description: z.string().max(225),
  task_description: z.string().optional(),
  status: z.string().min(1, { message: "Select status" }),
  material_content: z
    .array(z.instanceof(File))
    // .min(1, "Material content is required")
    .max(1, "Only one file is allowed"),
  video_content: z
    .array(z.instanceof(File))
    .min(1, "Video content is required")
    .max(1, "Only one file is allowed"),
  image: z
    .array(z.instanceof(File))
    .min(1, "Image is required")
    .max(1, "Only one file is allowed"),
});

type CourseFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  status: any;
  activities: any;
  quiz: any;
}

export const CourseForm: React.FC<ProductFormProps> = ({
  initialData,
  status,
  activities,
  quiz,
}) => {
  const fetch = useDirectusFetch();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? `Ubah ${initialData?.title ?? ""}`
    : "Buat materi pembelajaran";
  const description = initialData
    ? "Ubah data materi pembelajaran."
    : "Buat materi pembelajaran baru.";
  const action = initialData ? "Simpan Perubahan" : "Buat";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        duration: "",
        is_open_exam: false,
        is_open_task: false,
        min_score: "",
        description: "",
        task_description: "",
        activities: "",
        exam_quiz: "",
        status: "published",
        image: [],
        material_content: [],
        video_content: [],
      };

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: CourseFormValues) => {
    try {
      setLoading(true);

      const notify = {
        title: "Sukses!",
        description: `Materi pembelajaran ${data?.title} telah dibuat.`,
      };

      if (data.image && data.image.length > 0) {
        const resImage = await fetch.upload("files", data.image);
        data.image = resImage?.data?.data?.id ?? null;
      }

      if (data.material_content && data.material_content.length > 0) {
        const resImage = await fetch.upload("files", data.material_content);
        data.material_content = resImage?.data?.data?.id ?? null;
      }

      if (data.video_content && data.video_content.length > 0) {
        const resImage = await fetch.upload("files", data.video_content);
        data.video_content = resImage?.data?.data?.id ?? null;
      }

      // Clean data by removing empty arrays and null values
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0))
      );

      if (initialData === null) {
        await fetch.post("items/course/", { body: cleanedData });
      } else {
        await fetch.patch("items/course/" + initialData?.id, {
          body: cleanedData,
        });
        notify.description = `Materi pembelajaran ${data?.title} telah diubah.`;
      }

      // router.refresh();
      // router.push(`/course`);

      toast({
        variant: "success",
        title: notify.title,
        description: notify.description,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gagal.",
        description: "Terjadi kesalahan, silahkan ulangi kembali.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await fetch.delete("items/course/" + initialData?.id);

      toast({
        variant: "success",
        title: "Sukses!",
        description: `${initialData?.title} berhasil di hapus.`,
      });
      router.refresh();
      router.push(`/course`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-1 space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <div className="gap-4 md:grid md:col-span-2 md:grid-cols-2 h-fit">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>Judul</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Judul pembelajaran"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activities"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>Aktifitas</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl className="!text-left">
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih salah satu"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {activities.map((option) => (
                          <SelectItem key={option._id} value={option._id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((option: { _id: string; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                          <SelectItem key={option._id} value={option._id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="min_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Nilai</FormLabel>
                    <FormDescription className="!mt-0">
                      Minimum nilai untuk lulus pembelajaran
                    </FormDescription>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi</FormLabel>
                    <FormDescription className="!mt-0">
                      Estimasi durasi pembelajaran dalam satuan menit
                    </FormDescription>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Deskripsi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_open_exam"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start col-span-2 py-4 space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Ujian</FormLabel>
                      <FormDescription>
                        Centang jika ingin Materi Pembelajaran disertai ujian.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("is_open_exam") && (
                <FormField
                  control={form.control}
                  name="exam_quiz"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:pl-7 md:-mt-6">
                      <FormLabel>Kuis</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl className="!text-left">
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Pilih salah satu Kuis"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-40">
                          {/* @ts-ignore  */}
                          {quiz?.map((option) => (
                            <SelectItem key={option._id} value={option._id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="is_open_task"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start col-span-2 py-4 space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tugas</FormLabel>
                      <FormDescription>
                        Centang jika ingin Materi Pembelajaran disertai tugas.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("is_open_task") && (
                <FormField
                  control={form.control}
                  name="task_description"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:pl-7 md:-mt-6">
                      <FormLabel>Deskripsi Tugas</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Deskripsi untuk tugas"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="gap-4 h-fit md:grid md:col-span-1 md:grid-cols-1">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <div className="space-y-1 leading-none">
                      <FormLabel required>Gambar</FormLabel>
                      <FormDescription>
                        Preview gambar pada baner Pembelajaran
                      </FormDescription>
                    </div>
                    <FormControl>
                      <FileUpload name="image" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="material_content"
                render={() => (
                  <FormItem>
                    <div className="space-y-1 leading-none">
                      <FormLabel required>Konten PDF</FormLabel>
                      <FormDescription>
                        File tambahan untuk pembelajaran
                      </FormDescription>
                    </div>
                    <FormControl>
                      <FileUpload name="material_content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video_content"
                render={() => (
                  <FormItem>
                    <div className="space-y-1 leading-none">
                      <FormLabel required>Konten Video</FormLabel>
                      <FormDescription>Video Pembelajaran</FormDescription>
                    </div>
                    <FormControl>
                      <FileUpload name="video_content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
