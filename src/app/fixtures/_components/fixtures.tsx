"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Fixtures() {
  const matches = [
    {
      homeTeam: "Arsenal",
      awayTeam: "Man City",
      date: "05/02/2025",
      time: "3:00 p.m.",
      pot: "15K+",
      league: "EPL",
    },
    {
      homeTeam: "Aston Villa",
      awayTeam: "Celtic",
      date: "05/02/2025",
      time: "3:00 p.m.",
      pot: "35K+",
      league: "UCL",
    },
    {
      homeTeam: "Bayer Leverkusen",
      awayTeam: "Sparta P",
      date: "05/02/2025",
      time: "3:00 p.m.",
      pot: "25K+",
      league: "UCL",
    },
    {
      homeTeam: "Bayern",
      awayTeam: "Slovan Bratislava",
      date: "05/02/2025",
      time: "3:00 p.m.",
      pot: "25K+",
      league: "UCL",
    },
    {
      homeTeam: "Brest",
      awayTeam: "Real Madrid",
      date: "05/02/2025",
      time: "3:00 p.m.",
      pot: "25K+",
      league: "UCL",
    },
  ];

  return (
    <div className="w-full max-w-md p-4">
      {matches.map((match, index) => (
        <Card key={index} className="mb-3 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div>
                  <div className="text-xs font-bold  flex gap-1 ">
                    <span className=" text-muted">{match.league}</span>
                    {match.date} {match.time}
                  </div>
                  {/* soccer  icon*/}
                  <div className=" flex gap-2 font-semibold text-md items-center">
                    ⚽ {match.homeTeam} vs {match.awayTeam}
                  </div>
                </div>
                <div className="">
                  <div className="text-sm text-muted font-semibold">
                    Current Pot Price: {match.pot}
                  </div>
                </div>
                <div className="flex text-muted font-semibold">
                  <p>Market: 3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
