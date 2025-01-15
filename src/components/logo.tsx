import { Jersey_25 } from "next/font/google";

const jerseyFont = Jersey_25({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <div
      className={`logo text-3xl font-bold font-mono ${jerseyFont.className}`}
    >
      Fanatix
    </div>
  );
}
