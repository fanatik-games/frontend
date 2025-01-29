"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
    <div className=" mx-auto">
      <div className="">
        <h1 className="text-xl font-bold text-primary mb-1">Ongoing Duels</h1>
        <p className="text-sm text-muted font-semibold">
          These are the duels that are either ongoing or yet to start
        </p>
      </div>

      {matches.map((match, index) => (
        <Card key={index} className="my-4 border-0 rounded">
          <CardContent className="p-4">
            <div className="text-xs font-semibold text-muted mb-2 flex gap-1 shadow-none">
              {match.league}
              <p className="font-semibold text-black ">{match.date}</p>
            </div>
            <div className="flex items-center gap-2 mb-4 font-bold">
              ⚽ {match.teams}
            </div>

            {match.predictions.map((pred, predIndex) => (
              <div
                key={predIndex}
                className="bg-accent p-3 rounded-lg mb-2 last:mb-0"
              >
                <div className="font-medium mb-2">{pred.type}</div>
                <div className="text-sm text-muted flex gap-2">
                  Stake Amount:{" "}
                  <Image
                    width="14"
                    height="14"
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
          </CardContent>
        </Card>
      ))}

      <div className=" mb-4 py-4 border-y-[1px] border-border">
        <div className="text-lg font-bold mb-3">Total Stake</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Image
              width="14"
              height="14"
              src="https://img.icons8.com/arcade/64/coins--v1.png"
              alt="coins--v1"
            />{" "}
            <span>7500.00 F.C</span>
          </div>
          <div className="flex items-center justify-between text-green-600">
            <span className="text-[#19B270] font-semibold text-sm">
              Est. Winnings
            </span>
            <Image
              width="14"
              height="14"
              src="https://img.icons8.com/arcade/64/coins--v1.png"
              alt="coins--v1"
            />{" "}
            <span className=" text-primary font-semibold">7500.00 F.C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
