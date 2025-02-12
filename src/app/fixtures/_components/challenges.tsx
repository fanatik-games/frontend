"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BallIcon from "@/components/icons/ball-icon";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Challenge {
  id: string;
  title: string;
  fixtures: {
    metadata: {
      tournament: string;
      date: string;
    };
    title: string;
  };
}
interface ChallengeOutcome {
  title: string;
  id: string;
  outcomes: string[];
}
export default function OngoingChallenges() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fixtureId = searchParams.get("fixture");
  const challengeId = searchParams.get("challenge");
  const h2h = searchParams.get("h2h");

  const [dialogOpen, setDialogOpen] = useState(
    h2h && h2h.length > 0 ? true : false,
  );

  const { data } = useQuery({
    queryKey: ["challenges", fixtureId],
    queryFn: () =>
      fetch(API_URL + `/fixtures/challenges?fixtureId=${fixtureId}`).then(
        (res) => res.json(),
      ),
    enabled: !!fixtureId,
  });
  const [selectedChallenge, setSelectedChallenge] =
    React.useState<ChallengeOutcome | null>(null);
  const [selectedOutcome, setSelectedOutcome] = React.useState("");

  const handleChallengeSelect = (challengeId: string) => {
    const challenge = data.challenges.find(
      (c: ChallengeOutcome) => c.id === challengeId,
    );

    setSelectedChallenge(challenge);
  };

  const handleOutcomeSelect = (outcome: string) => {
    setSelectedOutcome(outcome);
  };
  const [amount, setAmount] = React.useState(0);
  const [userData, setUserData] = React.useState(
    typeof window !== "undefined" && localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null,
  );

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
          fixtureId: fixtureId,
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
    <div className="flex flex-col">
      {/* Header */}
      <Tabs defaultValue="h2h-challenges">
        <TabsList className="w-full md:w-80  flex justify-between bg-accent border border-muted/20">
          <TabsTrigger value="h2h-challenges" className="flex-1">
            H2H Duels
          </TabsTrigger>
          <TabsTrigger value="group-challenges" className="flex-1">
            Group Challenges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="h2h-challenges" className="max-w-5xl">
          {data && data.challenges ? (
            <div className="p-4 border rounded-xl">
              <div className="flex items-center gap-1">
                <span className="uppercase text-muted">
                  {data.fixture.metadata.competition}
                </span>
                <span>
                  {format(data.fixture.metadata.date, "dd/mm/yyy HH:mm")}
                </span>
              </div>
              <div className="flex gap-1 font-normal text-lg items-center mb-1">
                <BallIcon />
                <span>{data.fixture.title}</span>
              </div>

              <div className="">
                {/*  */}
                {/* Search and Create */}
                <div className="flex gap-4 mb-3 w-full justify-between items-center">
                  <Input
                    placeholder="Search Duel ..."
                    className="bg-accent h-8 w-[40%] focus-visible:ring-0 border-border border-[1px] rounded-lg"
                  />

                  <Button
                    className="bg-primary text-primary-foreground px-4 py-2 rounded"
                    onClick={() => {
                      if (h2h) {
                        router.push(
                          pathname +
                            "?" +
                            new URLSearchParams({
                              h2h: "abcd",
                            }).toString(),
                        );
                      }
                    }}
                  >
                    Create Challenge
                  </Button>
                  {/* duels */}
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="max-w-md">
                      <DialogHeader className=" my-0">
                        <DialogTitle className=" text-left font-medium my-0">
                          Select Challenge Outcome
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <p className=" text-left">{data.fixture.title}</p>
                          <div className="text-sm text-primary">
                            Kickoff Time:{" "}
                            {format(data.fixture.metadata.date, "HH:mm")}
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
                            {data.challenges.map(
                              (challenge: ChallengeOutcome) => (
                                <SelectItem
                                  key={challenge.id}
                                  value={challenge.id}
                                  className=" cursor-pointer"
                                >
                                  {challenge.title}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        {/* Outcome Buttons */}
                        {selectedChallenge && (
                          <div className="space-y-2 mt-4">
                            <div className="flex gap-2 w-[100%]">
                              {selectedChallenge.outcomes &&
                                selectedChallenge.outcomes.map(
                                  (outcome: string) => (
                                    <Button
                                      className={
                                        selectedOutcome === outcome
                                          ? "border-primary border-2 text-primary-foreground bg-accent flex-1 text-transform: capitalize"
                                          : "bg-accent  flex-1 text-primary text-transform: capitalize"
                                      }
                                      key={outcome}
                                      variant={
                                        selectedOutcome === outcome
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() =>
                                        handleOutcomeSelect(outcome)
                                      }
                                    >
                                      {selectedChallenge.title ===
                                      "who will win the match"
                                        ? outcome === "1"
                                          ? "Home"
                                          : outcome === "x"
                                            ? "Draw"
                                            : "Away"
                                        : outcome}
                                    </Button>
                                  ),
                                )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-primary">
                                <Label htmlFor="amount">Stake Amount</Label>
                                <h3 className="">Balance: {userData}.00</h3>
                              </div>

                              <Input
                                onChange={(e) =>
                                  setAmount(Number(e.target.value))
                                }
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
                            disabled={
                              !selectedOutcome || userData <= 0 || amount <= 0
                            }
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
                  {/* end */}
                </div>

                {/* Match Details */}
                <ScrollArea className="">
                  <ScrollBar>
                    <div className="s">
                      <div className="md:grid md:grid-cols-2 gap-2 flex flex-col">
                        {data &&
                          data.challenges.length > 0 &&
                          data.challenges.map((challenge: Challenge) => (
                            <div
                              key={challenge.id}
                              className="bg-accent rounded-md p-2"
                            >
                              <div className="">
                                <h3 className="text-md capitalize">
                                  {challenge.title}
                                </h3>
                                <div className="text-sm text-muted flex gap-2 items-center">
                                  Stake Amount:{" "}
                                  <Image
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/arcade/64/coins--v1.png"
                                    alt="coins--v1"
                                  />{" "}
                                </div>
                                <div className="text-sm text-muted">
                                  Created By:{" "}
                                </div>
                                <div className="text-sm text-muted">
                                  Prediction:{" "}
                                </div>
                                <Button
                                  size={"sm"}
                                  className="mt-2 hover:bg-blue-primay text-primary-foreground"
                                >
                                  Join Challenge
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </ScrollBar>
                </ScrollArea>
              </div>
            </div>
          ) : null}
        </TabsContent>
        <TabsContent value="group-challenges">
          <Card>
            <CardHeader>
              <CardTitle>Group Challenges</CardTitle>
              <CardDescription>
                Join with your friends and complete challenges together to win
                more points.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">Group</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
