"use client";

import { useState, useEffect } from "react";
import { H2HChallenge } from "@/components/h2h-challenge";
import { Auth } from "@/components/auth";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

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
  );
}
