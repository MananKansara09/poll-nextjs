import Link from "next/link";
import LoginForm from "@/components/login/loginform";
export default function Login() {
  return (
    <>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Log in</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below details to login polling system
          </p>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
