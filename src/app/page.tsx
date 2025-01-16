"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/logo";
import { UserNav } from "./auth/_components/user-nav";
import AccountTopUp from "@/components/account-top-up";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { session, isAuthenticating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session && !isAuthenticating) {
      router.push("/auth");
    }
    if (!isAuthenticating && session) {
      if (!session.user) router.push("/auth");
    }
  }, [session, isAuthenticating, router]);

  return (
    <div>
      <nav className="py-2 bg-accent/10 border-b border-accent sticky top-0">
        <div className="container px-2 md:px-0 mx-auto flex justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="account-actions flex gap-3 items-center">
            <AccountTopUp user={session?.user} />
            <UserNav user={session?.user} />
          </div>
        </div>
      </nav>
      <main className="flex flex-col-reverse md:flex-row container mx-auto gap-6">
        <div className="left min-w-96 max-w-md max-h-screen px-2 md:px-0">
          <h4 className="py-2 font-medium text-sm">Today &apos;s Fixtures</h4>
          <div className="fixtures-container border rounded-md">
            <ScrollArea className="h-[60vh]">
              <ScrollBar />
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className={cn("flex gap-1 flex-col py-3", {
                    "border-b": index !== 5,
                  })}
                >
                  <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
                    <div className="team-name text-sm">
                      English Premier League
                    </div>
                    <div className="time items-center flex gap-1 text-sm">
                      <Clock size={12} />
                      10:45pm
                    </div>
                  </div>
                  <div className="team-name text-base font-medium px-4">
                    Arsenal vs Tottenham
                  </div>
                  <div className="flex gap-2 text-sm px-4">
                    <div className="flex items-center gap-1">
                      <ChevronRight size={14} />2 challenges
                    </div>
                    <div className="flex gap-1">KES. 25000</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1 right px-2 md:px-0">
          <h4 className="py-2 font-medium text-sm">Ongoing Challenges</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="challenge border rounded-lg flex flex-col gap-1 py-2"
              >
                <div className="title text-lg font-semibold px-4">Over 2.5</div>
                <div className="flex items-center gap-1 px-4 text-neutral-500 font-medium">
                  <div className="team-name text-sm">
                    English Premier League
                  </div>
                  <div className="time items-center flex gap-1 text-sm">
                    <Clock size={12} />
                    10:45pm
                  </div>
                </div>
                <div className="team-name text-base font-medium px-4">
                  Arsenal vs Tottenham
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
                    <span className="uppercase text-md font-semibold">
                      under
                    </span>
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
                  <Button variant="default" className="w-full max-w-40 flex-1">
                    Join Challenge
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
