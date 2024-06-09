"use client"
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12 p-2">
            {children}
      
            
          </div>
          <div className="hidden bg-muted lg:block">
            <Image
              src="/photo/brandbanner.jpg"
              alt="Image"
              width={1080}
              height={1080}
              className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
