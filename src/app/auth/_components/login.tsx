"use client";
import Logo from "@/components/logo";
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
import { APP_URL, OTP_TOKEN_SIZE } from "@/lib/constants";
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
      options: {
        redirectTo: APP_URL,
      },
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
        <CardHeader className=" flex gap-2 flex-col ">
          <Logo className="w-20 h-5" />
          <CardTitle className="text-xl text-primary text-bold">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Glad to see you again! Let&apos;s get you back in the game.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showOtpInput ? (
            <form onSubmit={handleSendOtp}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className=" font-semibold text-primary"
                    >
                      Enter your phone number
                    </Label>
                    <Input
                      id="tel"
                      type="tel"
                      placeholder="Example: 0720123234"
                      onChange={(e) => setPhone(e.target.value)}
                      className=" border-border text-muted focus-visible:border-border focus-visible:ring-0 bg-accent "
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text primary-foreground font-bold "
                  >
                    Continue with phone number
                  </Button>
                </div>
                {/* or */}
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground font-semibold">
                    OR
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => handleSocialLogin("google")}
                    type="button"
                    variant="outline"
                    className="w-full border-primary text-primary font-bold"
                  >
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_623_41)">
                        <path
                          d="M18.7736 9.16838C18.7736 8.43093 18.7104 7.89279 18.5737 7.33472H9.68494V10.6632H14.9025C14.7973 11.4904 14.2293 12.7361 12.9669 13.5732L12.9492 13.6846L15.7597 15.7472L15.9544 15.7657C17.7427 14.201 18.7736 11.899 18.7736 9.16838Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M9.68496 17.9381C12.2411 17.9381 14.387 17.1408 15.9544 15.7656L12.967 13.5731C12.1675 14.1013 11.0945 14.47 9.68496 14.47C7.18138 14.47 5.0565 12.9055 4.29904 10.7429L4.18801 10.7519L1.26563 12.8945L1.22742 12.9951C2.78426 15.925 5.98213 17.9381 9.68496 17.9381Z"
                          fill="#34A853"
                        />
                        <path
                          d="M4.29898 10.7431C4.09911 10.185 3.98345 9.58704 3.98345 8.9692C3.98345 8.35129 4.09911 7.75338 4.28846 7.19531L4.28317 7.07645L1.32417 4.89941L1.22736 4.94304C0.585709 6.15886 0.217529 7.52419 0.217529 8.9692C0.217529 10.4142 0.585709 11.7795 1.22736 12.9953L4.29898 10.7431Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M9.68495 3.46802C11.4627 3.46802 12.6619 4.19551 13.3456 4.80346L16.0175 2.33196C14.3766 0.886946 12.2411 0 9.68495 0C5.98213 0 2.78426 2.01305 1.22742 4.94292L4.28852 7.19519C5.0565 5.03265 7.18138 3.46802 9.68495 3.46802Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_623_41">
                          <rect width="19" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Login with Google
                  </Button>
                  <Button
                    onClick={() => showToast()}
                    variant="outline"
                    type="button"
                    className="w-full border-primary text-primary font-bold"
                  >
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_623_39)">
                        <path
                          d="M14.6852 9.56283C14.7119 12.2868 17.2076 13.1933 17.2353 13.2048C17.2141 13.2687 16.8365 14.4966 15.9204 15.7649C15.1285 16.8615 14.3066 17.9539 13.0118 17.9766C11.7396 17.9988 11.3306 17.2619 9.87606 17.2619C8.42201 17.2619 7.9675 17.954 6.76321 17.9988C5.51346 18.0436 4.56176 16.8131 3.7633 15.7206C2.13167 13.4858 0.884773 9.4057 2.55904 6.65155C3.39078 5.28383 4.87717 4.41773 6.49051 4.39552C7.71773 4.37334 8.87605 5.1777 9.6263 5.1777C10.3761 5.1777 11.7837 4.21039 13.2635 4.35245C13.883 4.37688 15.6219 4.58952 16.7385 6.13794C16.6486 6.19078 14.6636 7.28549 14.6852 9.56283ZM12.2942 2.87397C12.9577 2.1131 13.4043 1.0539 13.2825 0C12.3261 0.0364156 11.1696 0.603766 10.4836 1.36422C9.86884 2.03763 9.33042 3.11548 9.4757 4.14852C10.5417 4.22665 11.6307 3.63532 12.2942 2.87397Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_623_39">
                          <rect width="19" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Login with Apple
                  </Button>
                </div>
                <div className="text-full text-primary text-xs  [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                  By clicking continue, you agree to our{" "}
                  <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>.
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
    </div>
  );
}
