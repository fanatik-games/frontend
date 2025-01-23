"use client";

import { API_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Clock } from "lucide-react";

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

  if (error) {
    return <div>Error: Could not fetch fixtures</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data &&
        data.map((fixture, index) => (
          <div
            key={index}
            className={cn("flex gap-1 flex-col py-3", {
              "border-b": index !== 5,
            })}
          >
            <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
              <div className="team-name text-sm">
                {fixture.metadata.competition}
              </div>
              <div className="time items-center flex gap-1 text-sm">
                <Clock size={12} />
                {new Date(fixture.metadata.date).toLocaleTimeString()}
              </div>
            </div>
            <div className="team-name text-base font-medium px-4">
              {fixture.title}
            </div>
            <div className="flex gap-2 text-sm px-4">
              <div className="flex items-center gap-1">
                <ChevronRight size={14} /> {fixture.markets.length} markets
              </div>
              <div className="flex gap-1">KES. 25000</div>
            </div>
          </div>
        ))}
    </div>
  );
}
