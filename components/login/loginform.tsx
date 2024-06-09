// components/LoginForm.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ReactNode } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useStore } from "@/store";

import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const s: any = useStore((state: any) => state);

  const onSubmit = async (data: any) => {
    const state = await s.login(data);
    toast(state.message);
    if (state.message) {
      const tokenExtraction = state.data.cookie.split("=")[1];
      const tok = tokenExtraction.split(" ");
      Cookies.set("accessToken", tok[0].split(";")[0]);
      localStorage.setItem("accessToken", tok[0].split(";")[0]);
      setTimeout(() => {
        router.push("/main");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">
            {errors.email.message as ReactNode}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="text-red-500">
            {errors.password.message as ReactNode}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <span>
        <Link href="/auth/signup">Sign up</Link>
      </span>
    </form>
  );
}
