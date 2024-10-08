"use client";

import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "@/provider/Auth";
import Image from "next/image";

// Adjusted schema to reflect actual form fields
const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    // .min(8, { message: "Password must be at least 8 characters" })
    .nonempty({ message: "Password is required" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);
    try {
      await login(data.email, data.password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#F5F5F5]">
      {/* <div className="hidden w-3/5 lg:block ">
        <Image
          src="/assets/img/general/login-image.png"
          width={160}
          height={10}
          alt="haleyora-logo"
          className="w-full"
        />
      </div> */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
        <div className="w-full max-w-md p-8 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border bg-primary-foreground rounded-xl">
          <div className="flex justify-center">
            <Image
              src="/assets/img/general/haleyora-logo.png"
              width={160}
              height={10}
              alt="haleyora-logo"
              className="w-4/6 h-auto mb-6"
            />
          </div>
          <p className="mb-2 text-2xl font-bold">Welcome back</p>
          <p className="text-[#787486] mb-4">
            Please enter your email & password
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label> */}
              <input
                id="email"
                type="email"
                {...register("email")}
                className="block w-full px-4 py-2 mt-1 bg-transparent border border-primary rounded-xl placeholder:text-black focus-visible:!ring-0 focus-visible:!border-none"
                placeholder="Email"
              />
              <p className="mt-2 text-sm text-red-600">
                {errors.email?.message}
              </p>
            </div>
            <div>
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label> */}
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="block w-full px-4 py-2 mt-1 bg-transparent border border-primary rounded-xl placeholder:text-black focus-visible:!ring-0 focus-visible:!border-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                >
                  {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-2 text-sm text-red-600">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:opacity-85"
              >
                {submitting ? "Signing In..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
