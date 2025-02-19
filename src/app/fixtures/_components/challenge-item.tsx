import { Button } from "@/components/ui/button";
import { Challenge } from "@/lib/types";
import Image from "next/image";

export default function ChallengeItem({ challenge }: { challenge: Challenge }) {
  return (
    <div className="bg-accent rounded-md p-2">
      <div className="">
        <h3 className="text-md capitalize">{challenge.title}</h3>
        <div className="text-sm text-muted flex gap-2 items-center">
          Stake Amount: {Number(challenge.amount).toFixed(2)} FC
          <Image
            width="20"
            height="20"
            src="https://img.icons8.com/arcade/64/coins--v1.png"
            alt="coins--v1"
          />{" "}
        </div>
        <div className="text-sm text-muted">
          Created By: {challenge.creatingUser?.username}
        </div>
        <div className="text-sm text-muted">
          Prediction: {challenge.creatingUserPrediction}
        </div>
        <Button
          size={"sm"}
          className="mt-2 hover:bg-blue-primay text-primary-foreground"
        >
          Join Challenge
        </Button>
      </div>
    </div>
  );
}
