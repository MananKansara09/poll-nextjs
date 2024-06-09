"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/store";
import * as z from "zod";
import { ReactNode } from "react";

// Define the Zod schema for the form
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function SignUpForm() {
  // Use the useForm hook with the zodResolver
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
    const state = await s.signup(data);
    toast(state.message);
    if (state.message) {
      setTimeout(() => {
        router.push("/auth/login");
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
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="text-red-500">
            {errors.password.message as ReactNode}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        SignUp
      </Button>
      <span>
        <Link href="/auth/login">log in</Link>
      </span>
    </form>
  );
}
