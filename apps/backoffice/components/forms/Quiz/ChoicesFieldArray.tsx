import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

const ChoicesFieldArray = ({ qIndex, control, register, errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `quiz_question.${qIndex}.choices`,
  });

  return (
    <div className="space-y-4">
      <FormLabel className="" required>Pilihan Jawaban</FormLabel>
      <div className="p-4 border rounded-xl">
        {fields.map((item, k) => {
          return (
            <FormField
              key={item.id}
              name={""}
              render={() => (
                <div className="flex items-end gap-2">
                  <FormItem className="w-fit">
                    <FormLabel
                      className={`${
                        errors?.quiz_question &&
                        errors?.quiz_question[qIndex]?.choices &&
                        errors?.quiz_question[qIndex]?.choices[k]?.id
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      Pilihan
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...register(
                          `quiz_question.${qIndex}.choices.${k}.id`,
                        )}
                      />
                    </FormControl>
                    {errors?.quiz_question &&
                      errors?.quiz_question[qIndex]?.choices &&
                      errors?.quiz_question[qIndex]?.choices[k]?.id && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                          {
                            errors?.quiz_question[qIndex]?.choices[k]?.id
                              .message
                          }
                        </p>
                      )}
                  </FormItem>
                  <FormItem className="w-full">
                    <FormLabel
                      className={`${
                        errors?.quiz_question &&
                        errors?.quiz_question[qIndex]?.choices &&
                        errors?.quiz_question[qIndex]?.choices[k]?.label
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      Jawaban
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...register(
                          `quiz_question.${qIndex}.choices.${k}.label`,
                        )}
                      />
                    </FormControl>
                    {errors?.quiz_question &&
                      errors?.quiz_question[qIndex]?.choices &&
                      errors?.quiz_question[qIndex]?.choices[k]?.label && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                          {
                            errors?.quiz_question[qIndex]?.choices[k]?.label
                              .message
                          }
                        </p>
                      )}
                  </FormItem>
                  <Button
                    onClick={() => remove(k)}
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            />
          );
        })}
      </div>
      <Button
        type="button"
        variant={"secondary"}
        // className="!mt-8"
        onClick={() => append({ id: "", label: "" })}
      >
        Tambah Pilihan
      </Button>
    </div>
  );
};

export default ChoicesFieldArray;
