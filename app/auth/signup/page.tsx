import SignUpform from "@/components/signup/signupform";
export default function Signup() {
  return (
    <>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below details to Sign up & Create Realtime polling
          </p>
        </div>
        <SignUpform />
      </div>
    </>
  );
}
