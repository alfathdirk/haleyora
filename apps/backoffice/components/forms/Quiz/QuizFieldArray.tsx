import { Button } from "@/components/ui/button";
import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import ChoicesFieldArray from "./ChoicesFieldArray";

const QuizFieldArray = ({ control, register, errors, getValues }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz_question",
  });

  return (
    <div className="gap-8 mb-8 md:grid md:grid-cols-2">
      {fields.map((item, index) => {
        return (
          <>
            <FormField
              key={item.id}
              name={""}
              render={() => (
                <div className="flex flex-col gap-4 p-4 border rounded-xl">
                  <div className="flex justify-between md:col-span-2">
                    <h1>Pertanyaan No. {index + 1}</h1>
                    {fields?.length > 1 && (
                      <Button onClick={() => remove(index)} variant={"link"}>
                        Hapus
                      </Button>
                    )}
                  </div>
                  <FormItem>
                    <FormLabel
                      className={`${
                        errors?.quiz_question &&
                        errors?.quiz_question[index]?.image
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      Image
                    </FormLabel>
                    <FormControl>
                      <Input {...register(`quiz_question.${index}.image`)} />
                    </FormControl>
                    {errors?.quiz_question &&
                      errors?.quiz_question[index]?.image && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                          {errors?.quiz_question[index].image.message}
                        </p>
                      )}
                  </FormItem>
                  <FormItem>
                    <FormLabel
                      className={`${
                        errors?.quiz_question &&
                        errors?.quiz_question[index]?.title
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      Pertanyaan
                    </FormLabel>
                    <FormControl>
                      <Input {...register(`quiz_question.${index}.title`)} />
                    </FormControl>
                    {errors?.quiz_question &&
                      errors?.quiz_question[index]?.title && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                          {errors?.quiz_question[index].title.message}
                        </p>
                      )}
                  </FormItem>
                  {/* Choices Component */}
                  <ChoicesFieldArray
                    qIndex={index}
                    {...{ control, register, errors }}
                  />
                  <FormItem>
                    <FormLabel
                      className={`${
                        errors?.quiz_question &&
                        errors?.quiz_question[index]?.answer
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      Jawaban Benar
                    </FormLabel>
                    <FormControl>
                      <Input {...register(`quiz_question.${index}.answer`)} />
                    </FormControl>
                    {errors?.quiz_question &&
                      errors?.quiz_question[index]?.answer && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                          {errors?.quiz_question[index].answer.message}
                        </p>
                      )}
                  </FormItem>
                </div>
              )}
            />
            {index + 1 === fields.length && (
              <div
                key={fields.length + 1}
                className="flex flex-row items-center justify-center gap-4 p-4 border cursor-pointer h-fit rounded-xl bg-gray-50 hover:bg-gray-100"
                onClick={() =>
                  append({
                    title: "",
                    image: "",
                    choices: [{ id: "", label: "" }],
                    answer: "",
                  })
                }
              >
                <Plus />
                Tambah Pertanyaan
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default QuizFieldArray;
