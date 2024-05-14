"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/components/breadcrumb";
import { MonitoringTable } from "@/components/tables/Monitoring/table";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import FileUpload from "@/components/FileUpload";
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama kategori harus lebih dari 3 karakter." }),
  image: z.array(z.instanceof(File)).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MonitoringPage() {
  const router = useRouter();
  const fetch = useDirectusFetch();

  const pageName = "Monitoring";

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    defaultValues: {
      name: "",
      image: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {

      // # Upload image
      if (data.image && data.image.length > 0) {
        const resImage = await fetch.upload("files", data.image);
        data.image = resImage?.data?.data?.id ?? null;
      } else {
        delete data.image;
      }

      await fetch.post("items/category", { body: data });

      toast({
        variant: "success",
        title: "Berhasil!",
        description: "Anda telah berhasil membuat kategori.",
      });

      form.reset();
      router.refresh();

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
    <div className="flex-1">
      <BreadCrumb items={[{ title: pageName, link: "/monitoring" }]} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description="Manejemen Kategori" />

        <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
          <DialogTrigger asChild>
            <Button size="lg">Buat Baru</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat {pageName}</DialogTitle>
              <DialogDescription>Isi data dibawah ini</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                id="category-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
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
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Files</FormLabel>
                      <FormControl>
                        <FileUpload name="image" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button type="submit" size="sm" form="category-form">
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <MonitoringTable />
    </div>
  );
}
