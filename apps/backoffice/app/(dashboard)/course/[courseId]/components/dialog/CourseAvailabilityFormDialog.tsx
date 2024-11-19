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
  entity: z.string().min(1, "Entitas harus dipilih."),
  entity_name: z.string().min(1, "Nama entitas harus dipilih."),
  start_date: z.string().min(1, "Tanggal mulai harus dipilih."),
  end_date: z.string().min(1, "Tanggal berakhir harus dipilih."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseAvailabilityFormDialog({
  courseId,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback,
  allData,
  setAllData,
}: {
  courseId: string;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
  allData: any[];
  setAllData: (data: any[]) => void;
}) {
  const fetch = useDirectusFetch();

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [entityNames, setEntityNames] = useState<
    { id: string; value: string }[]
  >([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entity: "",
      entity_name: "",
      start_date: "",
      end_date: "",
    },
  });

  const fetchEnitityNames = async () => {
    const selectedEntity = form.getValues("entity");
    const employeeKey = CourseAvailabilityArray.find(
      (item) => item.id === selectedEntity,
    )?.employee_key;

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
      const { data: res }: { data: { data: Record<string, string | null>[] } } =
        await fetch.get("items/employee", {
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
      setDateRange(undefined);
    }
  }, [showFormModal, form.watch("entity")]);

  const handleAddAvailability = async () => {
    const values = form.getValues();

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.error("Validation errors:", errors);

      Object.entries(errors).forEach(([field, messages]) => {
        if (messages?.[0]) {
          form.setError(field as keyof FormValues, {
            type: "manual",
            message: messages[0],
          });
        }
      });

      return; // Stop if validation fails
    }

    const { from, to } = dateRange || {};
    const availabilityEntry = {
      ...result.data, // Safe, validated data
      start_date: from?.toISOString() || "",
      end_date: to?.toISOString() || "",
    };

    setAllData([...allData, availabilityEntry]);
    setShowFormModal(false);
    form.reset();
    setEntityNames([]);
    setDateRange(undefined);
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
          <form id="form-course-availability" className="w-full space-y-4">
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
                  form.setValue("start_date", range?.from?.toISOString() || "");
                  form.setValue("end_date", range?.to?.toISOString() || "");
                }}
              />
              <FormMessage />
            </FormItem>
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            size="sm"
            form="form-course-availability"
            onClick={handleAddAvailability}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
