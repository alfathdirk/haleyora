"use client";

import { Button } from "@/components/ui/button";
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

interface DialogProps<TData, TValue> {
  name: string;
  title?: string;
  subTitle?: string;
  btnText?: string;
  btnSubmitText?: string;
}

export default function NewDataDialog<TData, TValue>({
  title = 'Title',
  name,
  subTitle,
  btnText = 'Buat baru',
  btnSubmitText = 'Simpan'
}: DialogProps<TData, TValue>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData);

    if (typeof title !== "string") return;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          ＋ {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subTitle}
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid items-center grid-cols-4 gap-4">
            <Input
              id="title"
              name="title"
              placeholder={`Masukkan ${name} baru..`}
              className="col-span-4"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              {btnSubmitText}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
