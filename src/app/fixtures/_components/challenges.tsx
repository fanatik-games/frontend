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

  const [active] = React.useState(false);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Tabs defaultValue="h2h-challenges">
        <TabsList className="w-80 flex justify-between bg-accent border border-muted/20">
          <TabsTrigger value="h2h-challenges" className="flex-1">
            H2H Duels
          </TabsTrigger>
          <TabsTrigger value="group-challenges" className="flex-1">
            Group Challenges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="h2h-challenges" className="max-w-5xl">
          {data && data.challenges ? (
            <Card>
              <CardHeader className="px-6 pt-4 pb-2 space-y-0">
                <div className="flex items-center gap-1">
                  <span className="uppercase text-muted">
                    {data.fixture.metadata.competition}
                  </span>
                  <span>
                    {format(data.fixture.metadata.date, "dd/mm/yyy HH:mm")}
                  </span>
                </div>
                <CardTitle className="flex gap-1 font-normal text-lg items-center">
                  <BallIcon />
                  <span>{data.fixture.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/*  */}
                {/* Search and Create */}
                <div className="flex gap-4 mb-6 w-full justify-between">
                  <Input
                    placeholder="Search Duel ..."
                    className="bg-accent w-[40%] focus-visible:ring-0 border-border border-[1px] rounded-lg"
                  />
                  <Button className=" hover:bg-blue-800">
                    <Plus className="w-4 h-4" />
                    Create Duel
                  </Button>
                </div>

                {/* Match Details */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    {data && data.challenges.length > 0 && (
                      <div key={0} className="mb-4">
                        <div className="flex flex-col gap-2 mb-4">
                          <span className="text-black text-sm flex gap-1">
                            <span className=" text-muted">
                              {data.fixture.metadata.competition}
                            </span>
                            {format(
                              data.fixture.metadata.date,
                              "dd/mm/yyy HH:mm",
                            )}
                          </span>
                          <div className="flex items-center">
                            <span className="flex gap-1 items-center  ">
                              <BallIcon /> {data.fixture.title}
                            </span>
                          </div>
                        </div>

                        <ScrollArea className="h-[45vh]">
                          <ScrollBar />
                          <div className="grid grid-cols-2 gap-4">
                            <h3 className="font-semibold mb-3">
                              {data.challenges[0].title}
                            </h3>
                            <div className="text-sm text-muted mb-1 flex gap-2 items-center">
                              Stake Amount:{" "}
                              <Image
                                width="25"
                                height="25"
                                src="https://img.icons8.com/arcade/64/coins--v1.png"
                                alt="coins--v1"
                              />{" "}
                            </div>
                            <div className="text-sm text-muted mb-1"></div>
                            <div className="text-sm text-muted mb-3"></div>
                            <Button className="w-full bg-primary hover:bg-blue-primay text-primary-foreground">
                              Join Challenge
                            </Button>
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
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
