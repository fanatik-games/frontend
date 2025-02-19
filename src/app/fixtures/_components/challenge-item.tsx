"use client";
import { Button } from "@/components/ui/button";
import { Challenge, Fixture } from "@/lib/types";
import Image from "next/image";
import ChallengeModal from "./challenge-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChallengeItem({
  challenge,
  fixture,
}: {
  challenge: Challenge;
  fixture: Fixture;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const getUserPrediction = (prediction: string) => {
    if (prediction === "1") {
      return "Home Win";
    } else if (prediction === "x") {
      return "Draw";
    } else if (prediction === "2") {
      return "Away Win";
    } else {
      return prediction;
    }
  };

  const handleUrlChange = () => {
    setDialogOpen(true);
    // const url = new URL(window.location.href);
    // const h2h = url.searchParams.get("h2h");
    // if (!h2h) {
    //   setDialogOpen(true);
    //   url.searchParams.append("h2h", "joining");
    // } else {
    //   url.searchParams.delete("h2h");
    // }
    // router.push(url.toString());
  };

  return (
    <div className="bg-accent rounded-md p-2">
      <div className="">
        <h3 className="text-md capitalize">{challenge.market.title}</h3>
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
          Prediction: {getUserPrediction(challenge.creatingUserPrediction)}
        </div>
        <Button
          size={"sm"}
          onClick={() => handleUrlChange()}
          className="mt-2 hover:bg-blue-primay text-primary-foreground"
        >
          Join Challenge
        </Button>
        <ChallengeModal
          open={dialogOpen}
          onOpenChange={(v) => {
            setDialogOpen(v);
            // handleUrlChange();
          }}
          isJoining={true}
          challenge={challenge}
          fixture={fixture}
        />
      </div>
    </div>
  );
}
