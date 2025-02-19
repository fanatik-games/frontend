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
import useAuth from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/user-info";
import { API_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { Challenge, ChallengeOutcome, Fixture, Market } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChallengeModal({
  fixture,
  open,
  challenge,
  onOpenChange,
  isJoining,
}: {
  open: boolean;
  fixture: Fixture;
  challenge?: Challenge;
  onOpenChange: (open: boolean) => void;
  isJoining?: boolean;
}) {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [amount, setAmount] = useState(0);
  const { session } = useAuth();

  const { data: user } = useUserProfile();
  const userBalance = user?.balance || 0;

  const { data: markets } = useQuery<Market[]>({
    queryKey: ["markets", fixture.id],
    queryFn: () =>
      fetch(API_URL + `/predictions/markets?fixtureId=${fixture.id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }).then((res) => res.json()),
    enabled: !!fixture.id && !!session,
  });

  const handleChallengeSelect = (challengeId: string) => {
    const market = markets?.find((c: Market) => c.id === challengeId);
    if (!market) return;
    setSelectedMarket(market);
  };

  const handleOutcomeSelect = (outcome: string) => {
    setSelectedOutcome(outcome);
  };

  const submitChallenge = async () => {
    const token = session?.access_token;
    const loadingToast = toast.loading("Creating prediction...");
    try {
      const response = await fetch(`${API_URL}/predictions/create-h2h`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fixtureId: fixture.id,
          marketId: selectedMarket?.id,
          outcome: selectedOutcome,
          amount: amount,
          ...(isJoining && { challengeId: challenge?.id }),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create prediction");
      }
      toast.dismiss(loadingToast);
      toast.success("H2H created successfully");

      return result;
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast.error("Failed to create H2H challenge: " + error.message);
      }
    } finally {
      toast.dismiss(loadingToast);
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (isJoining && challenge) {
      setSelectedMarket(challenge.market);
      setAmount(challenge.amount);
    }
  }, [isJoining, challenge]);

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
              Kickoff Time: {format(fixture.metadata.date!, "HH:mm")}
            </div>
          </div>

          {/* Challenge Selection Dropdown */}
          <Select
            defaultValue={selectedMarket?.id}
            onValueChange={handleChallengeSelect}
            disabled={isJoining}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a challenge">
                {selectedMarket?.title}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {markets?.map((market: Market) => (
                <SelectItem
                  key={market.id}
                  value={market.id}
                  className="cursor-pointer"
                >
                  {market.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Outcome Buttons */}
          {selectedMarket && (
            <div className="space-y-2 mt-4">
              <div className="flex gap-2 w-[100%]">
                {selectedMarket.outcomes &&
                  selectedMarket.outcomes.map((outcome: string) => (
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
                      disabled={
                        isJoining &&
                        challenge?.creatingUserPrediction === outcome
                      }
                      onClick={() => handleOutcomeSelect(outcome)}
                    >
                      {selectedMarket.title === "who will win the match"
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
                  value={challenge?.amount ?? 10}
                  readOnly={isJoining}
                  disabled={isJoining}
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
                const challengeLink = `${window.location.origin}/challenge/${selectedMarket?.id}?outcome=${selectedOutcome}`;
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
