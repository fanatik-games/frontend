"use client";

import CreateH2h from "@/components/createh2h";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock } from "lucide-react";

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

  return (
    <div className="space-y-2 my-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Ongoing Challenges</h4>
        <div className="flex justify-end">
          <CreateH2h />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {data &&
          data.challenges.map((challenge: Challenge, index: number) => (
            <div
              key={index}
              className="challenge border rounded-lg flex flex-col gap-1 py-2"
            >
              <div className="title text-lg font-semibold px-4">
                {challenge.title}
              </div>
              <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
                <div className="team-name text-sm">
                  {challenge.fixtures.metadata.tournament}
                </div>
                <div className="time items-center flex gap-1 text-sm">
                  <Clock size={12} />
                  {new Date(
                    challenge.fixtures.metadata.date,
                  ).toLocaleTimeString()}
                </div>
              </div>
              <div className="team-name text-base font-medium px-4">
                {challenge.fixtures.title}
              </div>
              <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
                <div className="team-name text-sm">Stake Amount: </div>
                <div className="time items-center flex gap-1 text-sm">
                  2,500 KES
                </div>
              </div>
              <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
                <div className="team-name text-sm bg-accent rounded-md px-2 py-1 font-semibold">
                  opponent: sean
                </div>
                <div className="time items-center flex gap-1 text-sm px-2">
                  <ArrowRight size={14} />{" "}
                  <span className="uppercase text-md font-semibold">under</span>
                </div>
              </div>
              <div className="px-4 py-2 flex items-center gap-2">
                <div className="flex-1 text-neutral-500 flex items-center">
                  <div className="team-name text-sm bg-accent rounded-md px-2 py-1 font-semibold ">
                    You
                  </div>
                  <div className="time items-center flex gap-1 text-sm px-2">
                    <ArrowRight size={14} />{" "}
                    <span className="uppercase text-md font-semibold">
                      Over
                    </span>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-700"
                >
                  Join Challenge
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
