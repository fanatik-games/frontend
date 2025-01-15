"use client";
import CreateH2h from "@/components/createh2h";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const Challenges = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/");
      } else {
        setUser(session.user);
      }
    };

    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (user === null) {
    return <div>Cheking if youre logged in...</div>;
  }

  return (
    <div className="m-4">
      <CreateH2h />
    </div>
  );
};

export default Challenges;
