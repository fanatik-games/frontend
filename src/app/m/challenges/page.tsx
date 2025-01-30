import OngoingChallenges from "@/app/fixtures/_components/challenges";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function MobileChallengesList() {
  return (
    <div className=" px-2">
      <Link
        href={"/m/fixtures"}
        className=" flex items-center space-x-1 py-4 gap-2"
      >
        <div className="flex items-center rounded-md border-border bg-accent justify-center p-1">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <p className=" text-lg">Back To Fixtures</p>
      </Link>
      <OngoingChallenges />
    </div>
  );
}
