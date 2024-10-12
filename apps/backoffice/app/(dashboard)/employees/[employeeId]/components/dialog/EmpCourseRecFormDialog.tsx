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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, ButtonProps } from "@/components/ui/button";

const formSchema = z.object({
  course: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmpCourseRecFormDialog({
  employeeId,
  triggerTitle,
  employeeRecommendations,
  dialogTriggerProps,
  onSubmitCallback,
}: {
  employeeId: string;
  employeeRecommendations: any[];
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  // Fetch task details including files
  const fetchCourses = async (data: any) => {
    try {
      const ids = data.map((i: any) => i?.course?.id);

      const { data: res } = await fetch.get("items/course", {
        params: {
          fields: ["id", "title"],
          filter: {
            status: {
              _eq: "published",
            },
            id: {
              _nin: ids,
            }
          },
        },
      });

      setCourses(res?.data); // Store the task details in state
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
    if (showFormModal && employeeRecommendations) {
      fetchCourses(employeeRecommendations); // Fetch task details when modal is opened
    } else {
      form.reset(); // Ensure form is reset when modal is closed
    }
  }, [showFormModal, form, employeeRecommendations]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await fetch.post("items/employee_course_recommendation", {
        body: { ...data, employee: employeeId },
      });

      if (onSubmitCallback) {
        onSubmitCallback();
      }

      toast({
        variant: "success",
        title: "Berhasil!",
        description: `Berhasil menambahkan rekomendasi.`,
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
          {triggerTitle ?? "Buat Baru"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Rekomendasi Pembelajaran</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="category-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
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
                          placeholder="Pilih Pembelajaran"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {courses?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
