import { LoginForm } from "./_components/login";

export default function AuthPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col  gap-4">
        <LoginForm />
      </div>
    </div>
  );
}
