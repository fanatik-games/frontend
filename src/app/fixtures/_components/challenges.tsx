"use client";

import React from "react";
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
  const { data } = useQuery({
    queryKey: ["challenges"],
    queryFn: () =>
      fetch(API_URL + `/fixtures/challenges`).then((res) => res.json()),
  });
  console.log(data, "data");
  const [active] = React.useState(false);

  return (
    <div className=" mx-auto p-4 bg-[#FDFCFC] flex flex-col">
      {/* Header */}
      <Tabs defaultValue="account" className=" bg-white">
        <TabsList className="grid w-full grid-cols-2 bg-accent">
          <TabsTrigger
            value="H2H Duels"
            className={`text-primary ${active ? "" : "bg-primary-foreground"}`}
          >
            H2H Duels
          </TabsTrigger>
          <TabsTrigger
            value="group challenges"
            className={`text-muted ${active ? "bg-primary-foreground" : ""}`}
          >
            Group Challenges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="H2H Duels" className="max-w-5xl">
          <Card>
            <CardHeader>
              {/* <CardTitle className=" text-primary">H2H Duels</CardTitle>
              <CardDescription>
                Challenge your friends in one-on-one duels and compete for
                points.
              </CardDescription> */}
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
                        <span className="text-black text-sm flex gap-1 font-semibold">
                          <span className=" text-muted">
                            {data.challenges[0].fixtures.metadata.tournament}
                          </span>
                          {data.challenges[0].fixtures.metadata.date}
                        </span>
                        <div className="flex items-center">
                          <span className="font-semibold">
                            {" "}
                            ⚽ {data.challenges[0].fixtures.title}
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
        </TabsContent>
        <TabsContent value="password">
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
