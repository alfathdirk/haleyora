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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

import { createItem, createItems, deleteItem, updateItem } from "@directus/sdk";
import { Checkbox } from "../ui/checkbox";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { AlertModal } from "../modal/alert-modal";
import QuizFieldArray from "./Quiz/QuizFieldArray";

const formSchema = z.object({
  title: z.string().min(1, { message: "Judul harus di isi." }),
  description: z.string().max(225),
  duration: z.string(),
  randomize: z.boolean().optional(),
  score_per_question: z.string(),
  task_description: z.string().optional(),
  quiz_question: z
    .array(
      z.object({
        title: z.string().min(1, "Question title is required."),
        image: z.string().optional(),
        choices: z
          .array(
            z.object({
              id: z.string().min(1, { message: "Id harus di isi." }),
              label: z.string().min(1, { message: "Jawaban harus di isi." }),
            }),
          )
          .min(1, { message: "Minimum 1 pilihan jawaban." }),
        answer: z.string().min(1, { message: "Jawaban harus di isi." }),
      }),
    )
    .min(1, { message: "Minimum 1 pertanyaan." }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  initialData: any | null;
  activities: any;
}

export const QuizForm: React.FC<FormProps> = ({ initialData, activities }) => {
  const { client } = useDirectusContext();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? `Ubah ${initialData?.title ?? ""}` : "Buat Kuis";
  const description = initialData ? "Ubah data Kuis." : "Buat Kuis baru.";
  const action = initialData ? "Simpan Perubahan" : "Buat";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        description: "",
        duration: "",
        randomize: "",
        score_per_question: "",
        quiz_question: [
          {
            title: "",
            image: "",
            choices: [{ id: "", label: "" }],
            answer: "",
          },
        ],
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const notify = {
        title: "Sukses!",
        description: `Kuis ${data?.title} telah dibuat.`,
      };
      setLoading(true);

      if (initialData === null) {
        const quizQuestions = data.quiz_question;
        delete data.quiz_question;
        const result = await client.request(createItem("quiz", data));

        const updatedQuestions = quizQuestions.map((question) => ({
          ...question,
          quiz_id: result.id,
        }));
        await client.request(createItems("quiz_question", updatedQuestions));
      } else {
        await client.request(updateItem("quiz", initialData?.id, data));
        notify.description = `Kuis ${data?.title} telah diubah.`;
      }

      // router.refresh();
      // router.push(`/quiz`);

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

      await client.request(deleteItem("quiz", initialData?.id));

      toast({
        variant: "success",
        title: "Sukses!",
        description: `${initialData?.title} berhasil di hapus.`,
      });
      router.refresh();
      router.push(`/quiz`);
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
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
              name="score_per_question"
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
              name="randomize"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start py-4 space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Acak Pertanyaan</FormLabel>
                    <FormDescription>
                      Centang jika ingin pertanyaan di acak.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <QuizFieldArray
            {...{
              control: form.control,
              register: form.register,
              defaultValues,
              getValues: form.getValues,
              setValue: form.setValue,
              errors: form.formState.errors,
            }}
          />

          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};