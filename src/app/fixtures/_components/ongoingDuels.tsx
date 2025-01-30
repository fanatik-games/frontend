"use client";
import React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BallIcon from "@/components/icons/ball-icon";

export default function OngoingDuels() {
  const matches = [
    {
      date: "05/02/2025 3:00 p.m",
      teams: "Arsenal vs Man City",
      league: "EPL",
      predictions: [
        {
          type: "Both Teams To Score",
          stake: "1500.00 F.C",
          prediction: "YES",
        },
        {
          type: "Match Outcome",
          stake: "1500.00 F.C",
          prediction: "Home Win",
        },
      ],
    },
    {
      date: "05/02/2025 3:00 p.m",
      teams: "Brest vs Real Madrid",
      league: "UCL",
      predictions: [
        {
          type: "Will Mbappe Score ?",
          stake: "1500.00 F.C",
          prediction: "YES",
        },
        {
          type: "Match Outcome",
          stake: "1500.00 F.C",
          prediction: "Home Win",
        },
      ],
    },
    {
      date: "05/02/2025 3:00 p.m",
      teams: "Aston Villa vs Celtic",
      league: "UCL",
      predictions: [
        {
          type: "Match Outcome",
          stake: "1500.00 F.C",
          prediction: "Home Win",
        },
      ],
    },
  ];

  return (
    <div className=" h-full overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl  text-primary mb-1">Ongoing Duels</h1>
        <p className="text-sm text-muted">
          These are the duels that are either ongoing or yet to start
        </p>
      </div>
      <ScrollArea className="h-[50vh]">
        {matches.map((match, index) => (
          <div key={index} className="my-4 space-y-2  ">
            <div className=" flex flex-col space-y-2 mt-2">
              <div className=" grid space-y-1">
                <div className="text-md  text-muted  flex gap-1 shadow-none px-4">
                  {match.league}
                  <p className=" text-black ">{match.date}</p>
                </div>
                <div className="px-4 flex text-lg items-center gap-2 mb-4">
                  <BallIcon />
                  {match.teams}
                </div>
              </div>

              {match.predictions.map((pred, predIndex) => (
                <div
                  key={predIndex}
                  className="bg-accent py-2 mb-2 last:mb-0 px-12 "
                >
                  <div className="font-medium">{pred.type}</div>
                  <div className="text-sm text-muted flex gap-2 items-center">
                    Stake Amount:{" "}
                    <Image
                      width="25"
                      height="25"
                      src="https://img.icons8.com/arcade/64/coins--v1.png"
                      alt="coins--v1"
                    />{" "}
                    {pred.stake}
                  </div>
                  <div className="text-sm text-muted">
                    Prediction: {pred.prediction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="border-y-[1px] border-border sticky mb-6 bg-white p-4">
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
