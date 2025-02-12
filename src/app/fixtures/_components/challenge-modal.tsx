"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserProfile } from "@/hooks/user-info";
import { API_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { ChallengeOutcome, Fixture } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export default function ChallengeModal({
  open,
  onOpenChange,
  challenges,
  fixture,
}: {
  open: boolean;
  challenges: ChallengeOutcome[];
  fixture: Fixture;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedChallenge, setSelectedChallenge] =
    useState<ChallengeOutcome | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [amount, setAmount] = useState(0);

  const { data: user } = useUserProfile();
  const userBalance = user?.balance || 0;

  const handleChallengeSelect = (challengeId: string) => {
    const challenge = challenges.find(
      (c: ChallengeOutcome) => c.id === challengeId,
    );
    if (!challenge) return;
    setSelectedChallenge(challenge);
  };

  const handleOutcomeSelect = (outcome: string) => {
    setSelectedOutcome(outcome);
  };

  const submitChallenge = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    try {
      const response = await fetch(`${API_URL}/predictions/create-h2h`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fixtureId: fixture.id,
          marketId: selectedChallenge?.id,
          outcome: selectedOutcome,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create prediction");
      }
      return result;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "You do not have enough FC"
      ) {
        toast.error("You do not have enough FC to place this bet");
      }
      console.error("Error creating prediction:", error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="my-0">
          <DialogTitle className="text-left font-medium my-0">
            Select Challenge Outcome
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <p className="text-left">{fixture.title}</p>
            <div className="text-sm text-primary">
              Kickoff Time: {format(fixture.metadata.date, "HH:mm")}
            </div>
          </div>
          {/* Challenge Selection Dropdown */}
          <Select onValueChange={handleChallengeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a challenge">
                {selectedChallenge?.title || "Select a challenge"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {challenges.map((challenge: ChallengeOutcome) => (
                <SelectItem
                  key={challenge.id}
                  value={challenge.id}
                  className=" cursor-pointer"
                >
                  {challenge.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Outcome Buttons */}
          {selectedChallenge && (
            <div className="space-y-2 mt-4">
              <div className="flex gap-2 w-[100%]">
                {selectedChallenge.outcomes &&
                  selectedChallenge.outcomes.map((outcome: string) => (
                    <Button
                      className={
                        selectedOutcome === outcome
                          ? "border-primary border-2 text-primary-foreground bg-accent flex-1 text-transform: capitalize"
                          : "bg-accent  flex-1 text-primary text-transform: capitalize"
                      }
                      key={outcome}
                      variant={
                        selectedOutcome === outcome ? "default" : "outline"
                      }
                      onClick={() => handleOutcomeSelect(outcome)}
                    >
                      {selectedChallenge.title === "who will win the match"
                        ? outcome === "1"
                          ? "Home"
                          : outcome === "x"
                            ? "Draw"
                            : "Away"
                        : outcome}
                    </Button>
                  ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-primary">
                  <Label htmlFor="amount">Stake Amount</Label>
                  <h3 className="">Balance: {userBalance}.00</h3>
                </div>

                <Input
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="bg-accent"
                />
              </div>
            </div>
          )}
          {/* Selected Outcome Display */}

          {/* Submit Button */}

          <div className="space-y-2">
            <Button
              variant="default"
              className="w-full"
              disabled={!selectedOutcome || userBalance <= 0 || amount <= 0}
              onClick={submitChallenge}
            >
              Submit
            </Button>

            <Button
              variant="outline"
              className="w-full"
              disabled={!selectedOutcome}
              onClick={() => {
                const challengeLink = `${window.location.origin}/challenge/${selectedChallenge?.id}?outcome=${selectedOutcome}`;
                navigator.clipboard.writeText(challengeLink);
              }}
            >
              Share Challenge Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
