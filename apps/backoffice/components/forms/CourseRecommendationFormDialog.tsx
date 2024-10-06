"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button, ButtonProps } from "@/components/ui/button";
import { Course } from "@/types/course";

const formSchema = z.object({
  tasks_score: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseRecommendationFormDialog({
  initialData,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback,
}: {
  initialData?: Course;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [employeeList, setEmployeeList] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    defaultValues: initialData,
  });

  const fetchData = async () => {
    if (!initialData?.id) return;

    try {
      const { data: res } = await fetch.get("items/employee_course_recommendation", {
        params: {
          fields: [
            "id",
            "course",
            "employee.full_name",
          ],
          filter: {
            course: initialData.id,
          },
        },
      });

      setEmployeeList(res?.data); // Store the task details in state
    } catch (error) {
      console.error("Failed to fetch task details:", error);
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: "Tidak dapat mengambil data tugas.",
      });
    }
  };

  useEffect(() => {
    if (showFormModal) {
      fetchData(); // Fetch task details when modal is opened
    } else {
      form.reset(); // Ensure form is reset when modal is closed
    }
  }, [showFormModal, form]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      if (initialData) {
        await fetch.patch("items/employee_course/" + initialData?.id, {
          body: data,
        });
      } else {
        await fetch.post("items/employee_course", { body: data });
      }

      if (onSubmitCallback) {
        onSubmitCallback();
      }

      toast({
        variant: "success",
        title: "Berhasil!",
        description: `Berhasil menyimpan penilaian tugas.`,
      });

      setShowFormModal(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: error.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
      <DialogTrigger asChild>
        <Button size="lg" {...dialogTriggerProps}>
          {triggerTitle ?? "-"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rekomendasi Pelajaran</DialogTitle>
          <DialogDescription>
            {initialData?.title ?? ""}
          </DialogDescription>
          <DialogDescription className="!mt-0">
            {/* Oleh {initialData?.employee?.full_name ?? "-"} */}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="category-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="tasks_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nilai Tugas</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" size="sm" form="category-form">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
