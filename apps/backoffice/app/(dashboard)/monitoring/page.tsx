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
// import Dropzone from "@/components/dropzone";
// import { FileCheck2Icon } from "lucide-react";

// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string(),
// });

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama kategori harus lebih dari 3 karakter." }),
  // image: z
  //   .array(ImgSchema),
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
      // image: [],
    },
  });

  // function handleOnDrop(acceptedFiles: FileList | null) {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     const allowedTypes = [{ name: "png", types: ["image/png"] }];
  //     const fileType = allowedTypes.find((allowedType) =>
  //       allowedType.types.find((type) => type === acceptedFiles[0].type)
  //     );
  //     if (!fileType) {
  //       form.setValue("image", []);
  //       form.setError("image", {
  //         message: "Masukkan tipe file gambar.",
  //         type: "typeError",
  //       });
  //     } else {
  //       form.setValue("image", [acceptedFiles]);
  //       form.clearErrors("image");
  //     }
  //   } else {
  //     form.setValue("image", []);
  //     form.setError("image", {
  //       message: "File is required",
  //       type: "typeError",
  //     });
  //   }
  // }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
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
                {/* <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Dropzone
                          {...field}
                          dropMessage="Drop files or click here"
                          handleOnDrop={handleOnDrop}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("image") && (
                  <div className="relative flex items-center justify-center gap-3 p-4">
                    <FileCheck2Icon className="w-4 h-4" />
                    <p className="text-sm font-medium">
                      {form.watch("image")?.name}
                    </p>
                  </div>
                )} */}
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
