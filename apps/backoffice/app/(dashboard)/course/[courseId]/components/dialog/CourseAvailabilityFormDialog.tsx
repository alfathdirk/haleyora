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
import { CourseAvaibilityArray } from "@/constants/course_avaibility";

const formSchema = z.object({
  entity: z.string(),
  entity_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseAvailabilityFormDialog({
  courseId,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback,
}: {
  courseId: string;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [entityNames, setEntityNames] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  const fetchEnitityNames = async () => {
    const selectedEntity = form.getValues('entity'); // Get the selected entity
    const employeeKey = CourseAvaibilityArray.find((item) => item.id === selectedEntity)?.employee_key;

    if (!employeeKey) {
      return;
    }

    if (selectedEntity === "All") {
      // If entity is "All", set entity_name to "All" and skip fetching
      setEntityNames([{ id: "All", value: "All" }]);
      form.setValue('entity_name', 'All');
      return;
    }

    setLoading(true);
    try {
      // Fetch entities dynamically based on the selected employee_key
      const { data: res }: { data: { data: Record<string, string | null>[] } } = await fetch.get("items/employee", {
        params: { fields: [employeeKey], groupBy: employeeKey },
      });

      // Map and filter results based on the employee_key
      const groupedEntities = res?.data
        ?.map((item) => ({
          id: item[employeeKey] ?? "",
          value: item[employeeKey] ?? "",
        }))
        .filter((entity) => entity.id); // Exclude entries with empty IDs

      setEntityNames(groupedEntities); // Update state with the grouped data
    } catch (error) {
      console.error("Error fetching entity names:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch entity names.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFormModal) {
      fetchEnitityNames(); // Fetch grouped entities when modal opens or entity changes
    } else {
      form.reset(); // Reset the form when modal closes
      setEntityNames([]); // Clear entity names
    }
  }, [showFormModal, form.watch('entity')]); // Watch 'entity' for changes

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await fetch.post("items/course_avaibility", {
        body: { ...data, course: courseId },
      });

      if (onSubmitCallback) {
        onSubmitCallback();
      }

      toast({
        variant: "success",
        title: "Berhasil!",
        description: `Berhasil menambahkan jadwal.`,
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
          <DialogTitle>Tambah Jadwal Ketersediaan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="category-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="entity"
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
                          placeholder="Pilih Entitas"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {CourseAvaibilityArray?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.value}
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
              name="entity_name"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={loading || !entityNames.length}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl className="!text-left">
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Pilih Nama Entitas"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entityNames?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.value}
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
