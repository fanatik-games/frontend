"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function OngoingDuels() {
  const matches = [
    {
      date: "05/02/2025 3:00 p.m",
      teams: "Arsenal vs Man City",
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
        <h1 className="text-xl font-bold text-blue-900 mb-1">Ongoing Duels</h1>
        <p className="text-sm text-gray-400">
          These are the duels that are either ongoing or yet to start
        </p>
      </div>

      {matches.map((match, index) => (
        <Card key={index} className="mb-4 bg-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400 mb-2">{match.date}</div>
            <div className="flex items-center gap-2 mb-4 font-medium">
              ⚽ {match.teams}
            </div>

            {match.predictions.map((pred, predIndex) => (
              <div
                key={predIndex}
                className="bg-accent p-3 rounded-lg mb-2 last:mb-0"
              >
                <div className="font-medium mb-2">{pred.type}</div>
                <div className="text-sm text-muted">
                  Stake Amount: <span className="text-yellow-500">★</span>{" "}
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

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="text-lg font-bold mb-3">Total Stake</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-yellow-500">★</span>
            <span>7500.00 F.C</span>
          </div>
          <div className="flex items-center justify-between text-green-600">
            <span className="text-green-400">Est. Winnings</span>
            <span className="text-yellow-500">★</span>
            <span className=" text-primary font-semibold">7500.00 F.C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
