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
import { useEffect, useState } from "react";
import { createItem, deleteItem, updateItem } from "@directus/sdk";
import { Checkbox } from "../ui/checkbox";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { AlertModal } from "../modal/alert-modal";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import FileUpload from "../FileUpload";

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});

export const IMG_MAX_LIMIT = 3;

const formSchema = z.object({
  // material_content: "",
  // video_content: "",
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
  material_content: z.array(z.instanceof(File)).optional(),
  // imgUrl: z
  //   .array(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
  //   .optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

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
        material_content: "",
        // video_content: "",
        is_open_exam: false,
        is_open_task: false,
        min_score: "",
        description: "",
        task_description: "",
        activities: "",
        exam_quiz: "",
        status: "Published",
        imgUrl: [],
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      const notify = {
        title: "Sukses!",
        description: `Materi pembelajaran ${data?.title} telah dibuat.`,
      };

      if (data.material_content && data.material_content.length > 0) {
        const resImage = await fetch.upload("files", data.material_content);
        data.material_content = resImage?.data?.data?.id ?? null;
      } else {
        delete data.material_content;
      }

      if (initialData === null) {
        await fetch.post("items/course/", { body: data });
      } else {
        await fetch.patch("items/course/" + initialData?.id, {
          body: data,
        });
        notify.description = `Materi pembelajaran ${data?.title} telah diubah.`;
      }

      router.refresh();
      router.push(`/course`);

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

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");

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
          {/* <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value || []}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="gap-8 md:grid md:grid-cols-3">
            <div className="gap-4 md:grid md:col-span-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="material_content"
                render={() => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <FileUpload name="material_content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Judul</FormLabel>
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
                  <FormItem>
                    <FormLabel>Aktifitas</FormLabel>
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
              <FormField
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
                        {/* @ts-ignore  */}
                        {status.map((option) => (
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
              <FormField
                control={form.control}
                name="min_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Nilai</FormLabel>
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
            </div>
            <div className="gap-4 h-fit md:grid md:col-span-1 md:grid-cols-1">
              <FormField
                control={form.control}
                name="is_open_exam"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start py-4 space-x-3 space-y-0 rounded-md">
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
                    <FormItem>
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
                        <SelectContent>
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
                  <FormItem className="flex flex-row items-start py-4 space-x-3 space-y-0 rounded-md">
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
                    <FormItem>
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
