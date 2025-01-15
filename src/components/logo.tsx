import { cn } from "@/lib/utils";
import { Jersey_25 } from "next/font/google";

const jerseyFont = Jersey_25({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `logo text-3xl font-bold font-mono ${jerseyFont.className}`,
        className,
      )}
    >
      Fanatix
    </div>
  );
}
