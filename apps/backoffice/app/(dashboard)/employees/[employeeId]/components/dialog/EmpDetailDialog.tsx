"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Employee } from "@/types/employee";

const formSchema = z.object({
  course: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmpDetailDialog({
  employee,
  triggerTitle,
  dialogTriggerProps,
  onSubmitCallback,
}: {
  employee?: Employee;
  triggerTitle?: React.ReactNode | string;
  dialogTriggerProps?: ButtonProps;
  onSubmitCallback?: () => void;
}) {
  const fetch = useDirectusFetch();

  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  // Fetch task details including files
  // const fetchEmployee = async () => {
  //   try {

  //     const { data: res } = await fetch.get("items/course", {
  //       params: {
  //         fields: ["id", "title"],
  //         filter: {
  //           status: {
  //             _eq: "published",
  //           },
  //         },
  //       },
  //     });

  //     setEmployee(res?.data); // Store the task details in state
  //   } catch (error) {
  //     console.error("Failed to fetch task details:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Gagal!",
  //       description: "Tidak dapat mengambil data tugas.",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (showFormModal) {
  //     fetchEmployee();
  //   }
  // }, [showFormModal, form, ]);

  return (
    <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
      <DialogTrigger asChild>
        <Button size="lg" {...dialogTriggerProps}>
          {triggerTitle ?? "Buat Baru"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Karyawan</DialogTitle>
        </DialogHeader>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-4 my-4 text-sm">
          <div className="">
            <div className="mb-1 font-semibold">Nama</div>
            <div>{employee?.full_name ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Status Kerja</div>
            <div>{employee?.work_status ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">No. Induk Karyawan</div>
            <div>{employee?.employee_id ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Email</div>
            <div>{employee?.email ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">No. Telepon</div>
            <div>{employee?.phone ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">TTL</div>
            <div>{employee?.place_of_birth ?? '-'}, {employee?.date_of_birth ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Jenis Kelamin</div>
            <div>{employee?.gender ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Agama</div>
            <div>{employee?.religion ?? '-'}</div>
          </div>
          <div className="col-span-2">
            <div className="mb-1 font-semibold">Alamat</div>
            <div>{employee?.address ?? '-'}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4 text-sm">
          <div className="col-span-2 ">
            <div className="mb-1 font-semibold">Unit PLN</div>
            <div>{employee?.unit_pln ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Penempatan</div>
            <div>{employee?.placement ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Unit</div>
            <div>{employee?.unit ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Posisi</div>
            <div>{employee?.position ?? '-'}</div>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Pekerjaan</div>
            <div>{employee?.job ?? '-'}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
