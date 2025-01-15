import { LoginForm } from "./_components/login";
import Logo from "@/components/logo";

export default function AuthPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Logo className="text-5xl" />
        <LoginForm />
      </div>
    </div>
  );
}
