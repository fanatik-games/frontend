"use client";
import Image from "next/image";
import { API_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BallIcon from "@/components/icons/ball-icon";
import { useEffect, useState } from "react";
import { isMobile } from "@/lib/utils";

interface Fixture {
  id: string;
  metadata: {
    competition: string;
    date: string;
  };
  title: string;
  markets: Record<string, string>[];
}

export default function Fixtures() {
  const [userAgent, setUserAgent] = useState("");
  const { data, isLoading, error } = useQuery<Fixture[]>({
    queryKey: ["fixtures"],
    queryFn: () => fetch(API_URL + "/fixtures").then((res) => res.json()),
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window.navigator) setUserAgent(window.navigator.userAgent);
  }, []);

  useEffect(() => {
    if (data) {
      router.push(
        pathname +
          "?" +
          new URLSearchParams({ fixture: data[0].id }).toString(),
      );
    }
  }, [data]);
  console.log(data, "data challenges");

  if (error) {
    return <div>Error: Could not fetch fixtures</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md">
      {data &&
        data.map((match, index) => (
          <div
            key={index}
            onClick={() =>
              isMobile(userAgent)
                ? router.push(
                    "/m/challenges" +
                      "?" +
                      new URLSearchParams({ fixture: match.id }).toString(),
                  )
                : router.push(
                    pathname +
                      "?" +
                      new URLSearchParams({ fixture: match.id }).toString(),
                  )
            }
            className={`flex mb-3 ${index !== data.length - 1 ? "border-b-[1px]" : ""} px-0`}
          >
            <div className="px-2 py-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className=" space-y-2">
                    <div className="text-xs flex gap-1 ">
                      <span className=" text-muted">
                        {match.metadata.competition}
                      </span>
                      {format(new Date(match.metadata.date), "dd/mm/yyy HH:mm")}
                    </div>
                    {/* soccer  icon*/}
                    <div className=" flex gap-1 text-lg items-center">
                      <BallIcon />
                      {match.title}
                    </div>
                  </div>
                  <div className="">
                    <div className="text-sm text-muted flex items-center  gap-2">
                      Current Pot Price:{" "}
                      <Image
                        width="20"
                        height="20"
                        src="https://img.icons8.com/arcade/64/coins--v1.png"
                        alt="coins--v1"
                      />{" "}
                      {/* {match.pot} */}
                    </div>
                  </div>
                  <div className="flex items-center text-muted text-sm">
                    <ChevronRight size={12} />
                    <p>Market: {match.markets.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
