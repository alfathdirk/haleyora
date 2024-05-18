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
import { Input } from "@/components/ui/input";
import { Button, ButtonProps } from "@/components/ui/button";
import { Sector } from "@/types/sector";
import useCategoriesStore from "@/stores/useCategoriesStore";

const formSchema = z.object({
  category_id: z.string().min(1, { message: "Kategori harus diisi!" }),
  title: z.string().min(3, { message: "Title harus lebih dari 3 karakter." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SectorFormDialog({
  initialData,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback
}: {
  initialData?: Sector;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();
  const { categories } = useCategoriesStore();

  const pageName = "Bidang";

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    defaultValues: initialData
      ? initialData
      : {
          category_id: "",
          title: "",
        },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      if (initialData) {
        await fetch.patch("items/sector/" + initialData?.id, {
          body: data,
        });
      } else {
        await fetch.post("items/sector", { body: data });
      }

      if (onSubmitCallback) {
        onSubmitCallback()
      }

      toast({
        variant: "success",
        title: "Berhasil!",
        description: `Anda telah berhasil ${
          initialData ? "merubah bidang" : "membuat bidang baru"
        }.`,
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

  useEffect(() => {
    if (!showFormModal) {
      form.reset(); // Ensure form is reset when modal is closed
    }
  }, [showFormModal, form]);

  return (
    <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
      <DialogTrigger asChild>
        <Button size="lg" {...dialogTriggerProps}>
          {triggerTitle ?? "Buat Baru"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? `Ubah ${initialData?.title ?? ""}`
              : `Buat ${pageName}`}
          </DialogTitle>
          <DialogDescription>Silahkan isi data dibawah ini</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="category-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
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
                      {categories?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
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
