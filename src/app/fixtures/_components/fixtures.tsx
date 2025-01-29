"use client";
import Image from "next/image";
import { API_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Fixture {
  metadata: {
    competition: string;
    date: string;
  };
  title: string;
  markets: Record<string, string>[];
}
export default function Fixtures() {
  const { data, isLoading, error } = useQuery<Fixture[]>({
    queryKey: ["fixtures"],
    queryFn: () => fetch(API_URL + "/fixtures").then((res) => res.json()),
  });
  console.log(data, "data");

  if (error) {
    return <div>Error: Could not fetch fixtures</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <div className="w-full max-w-md">
      {data.map((match, index) => (
        <div
          key={index}
          className={` flex mb-3 hover:shadow-lg transition-shadow ${index !== matches.length - 1 ? "border-b-[1px]" : ""} px-0`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className=" space-y-2">
                  <div className="text-xs font-bold  flex gap-1 ">
                    <span className=" text-muted">
                      {match.metadata.competition}
                    </span>
                    {match.metadata.date}
                  </div>
                  {/* soccer  icon*/}
                  <div className=" flex gap-2 font-semibold text-md items-center">
                    ⚽ {match.title}
                  </div>
                </div>
                <div className="">
                  <div className="text-sm text-muted font-semibold flex items-center  gap-2">
                    Current Pot Price:{" "}
                    <Image
                      width="25"
                      height="25"
                      src="https://img.icons8.com/arcade/64/coins--v1.png"
                      alt="coins--v1"
                    />{" "}
                    {/* {match.pot} */}
                  </div>
                </div>
                <div className="flex text-muted font-semibold">
                  <p>Market: {}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
