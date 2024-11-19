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
import { CourseAvailabilityArray } from "@/constants/course_avaibility";
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

const formSchema = z.object({
  entity: z.string(),
  entity_name: z.string(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
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
  const [entityNames, setEntityNames] = useState<{ id: string; value: string }[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entity: "",
      entity_name: "",
      start_date: null,
      end_date: null,
    },
  });

  const fetchEnitityNames = async () => {
    const selectedEntity = form.getValues("entity");
    const employeeKey = CourseAvailabilityArray.find((item) => item.id === selectedEntity)?.employee_key;

    if (!employeeKey) return;

    if (selectedEntity === "All") {
      setEntityNames([{ id: "All", value: "All" }]);
      form.setValue("entity_name", "All");
      return;
    } else {
      form.setValue("entity_name", ""); // Reset entity_name for other selections
    }

    setLoading(true);
    try {
      const { data: res }: { data: { data: Record<string, string | null>[] } } = await fetch.get("items/employee", {
        params: { fields: [employeeKey], groupBy: employeeKey },
      });

      const groupedEntities = res?.data
        ?.map((item) => ({
          id: item[employeeKey] ?? "",
          value: item[employeeKey] ?? "",
        }))
        .filter((entity) => entity.id);

      setEntityNames(groupedEntities);
    } catch (error) {
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
      fetchEnitityNames();
    } else {
      form.reset();
      setEntityNames([]);
      form.setValue("entity_name", "");
    }
  }, [showFormModal, form.watch("entity")]);

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
        <DialogHeader className="mb-4">
          <DialogTitle>Tambah Jadwal Ketersediaan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="category-form"
            onSubmit={form.handleSubmit((data) =>
              onSubmit({
                ...data,
                start_date: dateRange?.from?.toISOString() || null,
                end_date: dateRange?.to?.toISOString() || null,
              })
            )}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="entity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Entitas</FormLabel>
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
                      {CourseAvailabilityArray?.map((option) => (
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
                  <FormLabel required>Nama Entitas</FormLabel>
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
                      {entityNames.length > 0 ? (
                        entityNames.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.value}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="">
                          No options available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel required>Tanggal Mulai dan Berakhir</FormLabel>
              <CalendarDateRangePicker
                selectedRange={dateRange}
                onChange={(range) => {
                  setDateRange(range);
                  // Update form values directly
                  form.setValue('start_date', range?.from?.toISOString() || null);
                  form.setValue('end_date', range?.to?.toISOString() || null);
                }}
              />
              <FormMessage />
            </FormItem>

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
