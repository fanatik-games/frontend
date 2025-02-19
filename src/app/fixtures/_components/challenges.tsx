"use client";
import BallIcon from "@/components/icons/ball-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL } from "@/lib/constants";
import { Challenge } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChallengeModal from "./challenge-modal";
import { PlusIcon } from "lucide-react";
import ChallengeItem from "./challenge-item";
import useAuth from "@/hooks/useAuth";

export default function OngoingChallenges() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fixtureId = searchParams.get("fixture");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (!searchParams) return;
    const h2h = searchParams.get("h2h");
    if (h2h) setDialogOpen(true);
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["challenges", fixtureId],
    queryFn: () =>
      fetch(API_URL + `/fixtures/challenges?fixtureId=${fixtureId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }).then((res) => res.json()),
    enabled: !!fixtureId && !!session,
  });

  const handleUrlChange = () => {
    const url = new URL(window.location.href);
    const h2h = url.searchParams.get("h2h");
    if (!h2h) {
      setDialogOpen(true);
      url.searchParams.append("h2h", "new");
    } else {
      url.searchParams.delete("h2h");
    }
    router.push(url.toString());
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
                <div className="flex gap-4 mb-3 w-full justify-between items-center">
                  <Input
                    placeholder="Search Duel ..."
                    className="bg-accent h-8 w-[40%] focus-visible:ring-0 border-border border-[1px] rounded-lg"
                  />
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="flex items-center px-4 py-2 rounded-md"
                    onClick={() => handleUrlChange()}
                  >
                    <PlusIcon />
                    Create Challenge
                  </Button>
                  <ChallengeModal
                    open={dialogOpen}
                    onOpenChange={(v) => {
                      setDialogOpen(v);
                      handleUrlChange();
                    }}
                    fixture={data.fixture}
                  />
                </div>

                {/* Match Details */}

                <ScrollArea className="">
                  <ScrollBar />
                  <div className="s">
                    <div className="md:grid md:grid-cols-2 gap-2 flex flex-col">
                      {data.challenges.map((challenge: Challenge) => (
                        <ChallengeItem
                          key={challenge.id}
                          challenge={challenge}
                          fixture={data.fixture}
                        />
                      ))}
                    </div>
                  </div>
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
