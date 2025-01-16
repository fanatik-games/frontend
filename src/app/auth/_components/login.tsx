"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { OTP_TOKEN_SIZE } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter();

  const formatPhoneNumber = (phone: string) => {
    return phone.startsWith("0") ? `+254${phone.slice(1)}` : `+254${phone}`;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const phoneNo = formatPhoneNumber(phone);

    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNo,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setShowOtpInput(true);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.verifyOtp({
      phone: formatPhoneNumber(phone),
      token: otp,
      type: "sms",
    });

    if (!error) {
      router.push("/");
    }

    if (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      setMessage(error.message);
    }
  };

  const showToast = () => {
    toast.info(
      "This feature is not yet available, for now login using your phone number",
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Glad to see you again! Let&apos;s get you back in the game.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showOtpInput ? (
            <form onSubmit={handleSendOtp}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => showToast()}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Apple
                  </Button>
                  <Button
                    onClick={() => handleSocialLogin("google")}
                    type="button"
                    variant="outline"
                    className="w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Continue with phone number
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Phone Number</Label>
                    <Input
                      id="tel"
                      type="tel"
                      placeholder="Example: 0720123234"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={OTP_TOKEN_SIZE}
                  className="text-3xl"
                >
                  <InputOTPGroup className=" relative">
                    {Array.from({ length: OTP_TOKEN_SIZE }).map((_, index) => (
                      <InputOTPSlot
                        className="text-2xl w-14 h-14"
                        key={index}
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowOtpInput(false)}
                >
                  Back
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
