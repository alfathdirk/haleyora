"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { useState } from "react";

export const DeleteAction = ({
  data,
  onConfirmCallback,
}: {
  data: any;
  onConfirmCallback: (data: any[]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    setLoading(true);

    try {
      if (onConfirmCallback) {
        onConfirmCallback(data)
      }
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
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 h-fit group hover:bg-transparent"
        variant={"ghost"}
      >
        <Trash className="w-4 h-auto text-gray-400 group-hover:text-red-500" />
      </Button>
    </>
  );
};
