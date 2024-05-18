"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteAction = ({ data, onConfirmCallback }: any) => {
  const fetch = useDirectusFetch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);

    try {
      await fetch.delete("items/sector/" + data?.id, {
        body: data,
      });

      if (onConfirmCallback) {
        onConfirmCallback();
      }

      toast({
        variant: "success",
        title: "Sukses!",
        description: `${data?.title} berhasil di hapus.`,
      });

      router.refresh();
      setOpen(false);
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
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button
        onClick={() => setOpen(true)}
        className="p-2 h-fit group hover:bg-transparent"
        variant={"ghost"}
      >
        <Trash className="w-4 h-auto text-gray-400 group-hover:text-red-500" />
      </Button>
    </>
  );
};
