"use client";
import { ReactNode, useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store";
import * as z from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function Account() {
  const userDetails = useStore((state: any) => state.users);
  const updateDetails = useStore((state: any) => state.updateUser);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [image, setImage] = useState("");

  // Ensure userDetails is properly initialized
  const [initializedUserDetails, setInitializedUserDetails] = useState<any>({
    email: "",
    profileImage: null,
    username: "User", // Default username in case it's null
  });

  useEffect(() => {
    if (userDetails) {
      setInitializedUserDetails(userDetails);
    }
  }, [userDetails]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: initializedUserDetails.email || "",
      profileImage: initializedUserDetails.profileImage || null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files && e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (image) {
      formData.append("profileImage", image);
    }
    formData.append("email", data.email);
    const updatedData = await updateDetails(formData);
    console.log(updatedData);
    toast(updatedData.message);
  };

  if (!initializedUserDetails) {
    return <div>Loading...</div>; // Render a loading state if userDetails is not ready
  }

  return (
    <Card className="w-full max-w-[850px]">
      <CardHeader>
        <CardTitle>Account settings</CardTitle>
        <CardDescription>Used to Update Your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Avatar>
              {initializedUserDetails.profileImage ? ( // Display avatar preview if available
                !avatarPreview ? (
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${initializedUserDetails.profileImage}`}
                  />
                ) : (
                  <AvatarImage src={avatarPreview} />
                )
              ) : (
                <>
                  <AvatarFallback>
                    {initializedUserDetails.username.slice(0, 4)}
                  </AvatarFallback>
                  <span>Select an image</span>
                </>
              )}
            </Avatar>
            <Input
              id="profilePhoto"
              type="file"
              onChange={handleImageChange} // Call handleImageChange on file selection
              accept="image/*"
            />
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors.email.message as ReactNode}
                </span>
              )}
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4"></CardFooter>
    </Card>
  );
}
