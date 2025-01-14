"use client";

import { useState, useEffect } from "react";
import { H2HChallenge } from "@/components/h2h-challenge";
import { Auth } from "@/components/auth";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Link href="/challenges" className="text-blue-500 flex justify-center">
        Challenges Created
      </Link>
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        {user ? (
          <H2HChallenge
            homeTeam="Manchester United"
            awayTeam="Liverpool"
            competition="Premier League"
            date="May 15, 2023"
            time="20:00 GMT"
          />
        ) : (
          <Auth />
        )}
      </main>
    </div>
  );
}
