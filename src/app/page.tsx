"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/logo";
import { UserNav } from "./auth/_components/user-nav";
import AccountTopUp from "@/components/account-top-up";
import { H2HChallenge } from "@/components/h2h-challenge";

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
      <main className="flex container mx-auto min-h-screen flex-col items-center justify-center p-6">
        <H2HChallenge
          homeTeam="Manchester United"
          awayTeam="Liverpool"
          competition="Premier League"
          date="May 15, 2023"
          time="20:00 GMT"
        />
      </main>
    </div>
  );
}
