"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import BallIcon from "@/components/icons/ball-icon";
import { format } from "date-fns";

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
export default function OngoingChallenges() {
  const searchParams = useSearchParams();
  const fixtureId = searchParams.get("fixture");

  const { data } = useQuery({
    queryKey: ["challenges", fixtureId],
    queryFn: () =>
      fetch(API_URL + `/fixtures/challenges?fixtureId=${fixtureId}`).then(
        (res) => res.json(),
      ),
    enabled: !!fixtureId,
  });

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
                <div className="flex gap-4 mb-3 w-full justify-between">
                  <Input
                    placeholder="Search Duel ..."
                    className="bg-accent h-8 w-[40%] focus-visible:ring-0 border-border border-[1px] rounded-lg"
                  />
                  <Button size={"sm"} className=" hover:bg-blue-800">
                    <Plus className="w-4 h-4" />
                    Create Duel
                  </Button>
                </div>

                {/* Match Details */}
                <div className="s">
                  <div className="grid grid-cols-2 gap-1">
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
