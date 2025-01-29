"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function OngoingChallenges() {
  return (
    <div className=" mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 rounded-md border-border border-[1px] w-fit p-1 ">
        <div className="bg-orange-500 px-6 py-2 rounded-lg font-semibold">
          H2H Duels
        </div>
        <div className="text-gray-400 px-6 py-2">Group Challenges</div>
      </div>

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
          <div className="flex flex-col gap-2 mb-4">
            <span className="text-gray-400 text-sm flex gap-1">
              <span>EPL</span>05/02/2025 3:00 p.m
            </span>
            <div className="flex items-center">
              <span className="font-semibold">Arsenal vs Man City</span>
            </div>
          </div>

          {/* Prediction Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Match Outcome",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "Home Win",
              },
              {
                title: "Both Teams To Score",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "YES",
              },
              {
                title: "Will Kai Havertz Score ?",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "YES",
              },
              {
                title: "Both Teams To Score",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "YES",
              },
              {
                title: "Match Outcome",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "Home Win",
              },
              {
                title: "Who wins the 1st half",
                stake: "1500.00 F.C",
                creator: "Admin",
                prediction: "Home Win",
              },
            ].map((item, index) => (
              <div key={index} className="bg-accent p-4 rounded-lg">
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <div className="text-sm text-muted mb-1">
                  Stake Amount: <span className="text-yellow-500">★</span>{" "}
                  {item.stake}
                </div>
                <div className="text-sm text-muted mb-1">
                  Created By: {item.creator}
                </div>
                <div className="text-sm text-muted mb-3">
                  Prediction: {item.prediction}
                </div>
                <Button className="w-full bg-primary hover:bg-blue-primay text-primary-foreground">
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
