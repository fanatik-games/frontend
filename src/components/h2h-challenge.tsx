"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, CalendarDays, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type Prediction = "1" | "X" | "2" | null;

interface H2HChallengeProps {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  time: string;
}

export function H2HChallenge({
  homeTeam,
  awayTeam,
  competition,
  date,
  time,
}: H2HChallengeProps) {
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handlePrediction = (newPrediction: Prediction) => {
    setPrediction(newPrediction);
  };

  const handleConfirm = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const { data, error } = await supabase.from("predictions").insert([
        {
          user_id: user.id,
          home_team: homeTeam,
          away_team: awayTeam,
          prediction,
        },
      ]);

      if (error) throw error;

      console.log("Prediction saved:", data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving prediction:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return <p>Please sign in to make predictions.</p>;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span className="jersey-font">{competition}</span>
          </span>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h2 className="text-lg font-semibold jersey-font">
            {homeTeam} vs {awayTeam}
          </h2>
          <div className="flex items-center space-x-4 mt-2">
            <CalendarDays className="h-4 w-4" />
            <span className="text-sm">{date}</span>
            <Clock className="h-4 w-4" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 mb-4">
          <PredictionButton
            label="Home"
            value="1"
            isSelected={prediction === "1"}
            onClick={() => handlePrediction("1")}
          />
          <PredictionButton
            label="Draw"
            value="X"
            isSelected={prediction === "X"}
            onClick={() => handlePrediction("X")}
          />
          <PredictionButton
            label="Away"
            value="2"
            isSelected={prediction === "2"}
            onClick={() => handlePrediction("2")}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={!prediction}>
              Confirm Prediction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Your Prediction</DialogTitle>
              <DialogDescription>
                Are you sure you want to predict{" "}
                {prediction === "1"
                  ? "Home Win"
                  : prediction === "X"
                  ? "Draw"
                  : "Away Win"}{" "}
                for {homeTeam} vs {awayTeam}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

interface PredictionButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

function PredictionButton({
  label,
  value,
  isSelected,
  onClick,
}: PredictionButtonProps) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className="w-full h-12 text-xs font-semibold rounded-none"
      onClick={onClick}
    >
      {label}
      <span className="block text-xs mt-1">{value}</span>
    </Button>
  );
}
