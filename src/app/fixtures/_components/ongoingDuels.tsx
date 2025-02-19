"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BallIcon from "@/components/icons/ball-icon";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { Challenge } from "@/lib/types";
import { format } from "date-fns";

export default function OngoingDuels() {
  const { session } = useAuth();

  const { data } = useQuery<Challenge[]>({
    queryKey: ["my-challenges"],
    queryFn: () =>
      fetch(API_URL + `/predictions/my-challenges`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }).then((res) => res.json()),
    enabled: !!session,
  });

  return (
    <div className=" h-full overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl  text-primary mb-1">Ongoing Duels</h1>
        <p className="text-sm text-muted">
          These are the duels that are either ongoing or yet to start
        </p>
      </div>
      <ScrollArea className="h-[50vh]">
        {data?.map((challenge, index) => (
          <div key={index} className="my-4 space-y-2  ">
            <div className=" flex flex-col space-y-2 mt-2">
              <div className=" grid space-y-1">
                <div className="text-md  text-muted  flex gap-1 shadow-none px-4">
                  {challenge.fixture.metadata.competition}
                  <p className=" text-black ">
                    {format(
                      challenge.fixture.metadata.date!,
                      "dd/mm/yyyy HH:mm",
                    )}
                  </p>
                </div>
                <div className="px-4 flex text-lg items-center gap-2 mb-4">
                  <BallIcon />
                  {challenge.fixture.title}
                </div>
              </div>

              <div className="bg-accent py-2 mb-2 last:mb-0 px-12 ">
                <div className="font-medium">{challenge.market.title}</div>
                <div className="text-sm text-muted flex gap-2 items-center">
                  Stake Amount:
                  <Image
                    width="25"
                    height="25"
                    src="https://img.icons8.com/arcade/64/coins--v1.png"
                    alt="coins--v1"
                  />{" "}
                  {challenge.amount.toFixed(2)}
                </div>
                <div className="text-sm text-muted">
                  Prediction:
                  {challenge.creatingUserId === session?.user.id
                    ? challenge.creatingUserPrediction
                    : challenge.acceptingUserPrediction}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="border-t-[1px] border-border sticky mb-6 bg-white p-4">
        <div className="text-lg  mb-3">Total Stake</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              width="25"
              height="25"
              src="https://img.icons8.com/arcade/64/coins--v1.png"
              alt="coins--v1"
            />{" "}
            <span>7500.00 F.C</span>
          </div>
          <div className="flex items-center gap-4 text-green-600">
            <span className="text-[#19B270] text-sm">Est. Winnings</span>
            <Image
              width="25"
              height="25"
              src="https://img.icons8.com/arcade/64/coins--v1.png"
              alt="coins--v1"
            />{" "}
            <span className=" text-primary ">7500.00 F.C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
