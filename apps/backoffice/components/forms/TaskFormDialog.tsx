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
import { Task } from "@/types/task";
import { useDirectusContext } from "@/hooks/useDirectusContext";

const formSchema = z.object({
  tasks_score: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function TaskFormDialog({
  initialData,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback,
}: {
  initialData?: Task;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();
  const { accessToken } = useDirectusContext(); // Get the access token from Directus context

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    defaultValues: initialData,
  });

  // Fetch task details including files
  const fetchTaskDetails = async () => {
    if (!initialData?.tasks || initialData?.tasks.length === 0) return;

    try {
      const { data: res } = await fetch.get("items/employee_course_files", {
        params: {
          fields: [
            "id",
            "directus_files_id.id",
            "directus_files_id.type",
            "directus_files_id.title",
            "directus_files_id.filename_download",
          ],
          filter: {
            employee_course_id: initialData.id,
          },
        },
      });

      setTaskDetails(res?.data); // Store the task details in state
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
      fetchTaskDetails(); // Fetch task details when modal is opened
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

  // Construct the Directus file URL with the access token
  const getDownloadUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${fileId}?download=&access_token=${accessToken}`;
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
          <DialogTitle>Penilaian Tugas</DialogTitle>
          <DialogDescription>
            {initialData?.course?.title ?? ""}
          </DialogDescription>
          <DialogDescription className="!mt-0">
            Oleh {initialData?.employee?.full_name ?? "-"}
          </DialogDescription>
        </DialogHeader>

        {/* Task Files Preview */}
        {taskDetails.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium">File Tugas:</h4>
            <ul className="mt-2 space-y-2">
              {taskDetails.map((task: any) => (
                <li key={task.id} className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {task.directus_files_id.title}
                  </span>
                  <a
                    href={getDownloadUrl(task.directus_files_id.id)} // Dynamic URL with token
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                  <span className="text-gray-500">
                    ({task.directus_files_id.type})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
