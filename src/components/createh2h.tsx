"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";

type ChallengeData = {
  title: string;
  team: string;
  wager: string;
  amount: string;
  prediction: string;
};

export default function CreateH2h() {
  const [challenge, setChallenge] = useState<ChallengeData[]>([]);
  const [data, setData] = useState<ChallengeData>({
    title: "",
    team: "",
    wager: "",
    amount: "",
    prediction: "",
  });
  const { data: fixtures } = useQuery({
    queryKey: ["fixtures"],
    queryFn: () => fetch(API_URL + "/fixtures").then((res) => res.json()),
  });
  const [selectedFixture, setSelectedFixture] = useState();
  const [fixturesMap, setFixturesMap] = useState({});

  useEffect(() => {
    if (!fixtures) return;
    const fixturesMap = {};
    fixtures.forEach((fixture) => {
      fixturesMap[fixture.title] = [...fixture.markets];
    });
    setFixturesMap(fixturesMap);
    // const titles = fixtures
    //   .map((fx) => fx.markets)
    //   .flat()
    //   .map((f) => f.title);
  }, [fixtures]);

  const handleChange = (field: keyof ChallengeData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChallenge([...challenge, data]);
    setData({
      title: "",
      team: "",
      wager: "",
      amount: "",
      prediction: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <PlusIcon />
          <span>Create Challenge</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-sm">
        <DialogHeader className="px-3 pt-2">
          <DialogTitle>Create Head to Head Prediction</DialogTitle>
          <DialogDescription>
            Fill in the details to create a head to head prediction
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="px-2 space-y-2">
            <Select
              value={JSON.stringify(selectedFixture)}
              onValueChange={(value) => setSelectedFixture(JSON.parse(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  className="w-full"
                  placeholder="Select a fixture"
                />
              </SelectTrigger>
              {fixtures && (
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel className="text-xs">
                      Today&apos;s top fixtures
                    </SelectLabel>
                    {Object.keys(fixturesMap).map((title) => {
                      const markets = fixturesMap[title];
                      return markets.map((market, index) => (
                        <SelectItem key={index} value={JSON.stringify(market)}>
                          {title} - {market.title}
                        </SelectItem>
                      ));
                    })}
                  </SelectGroup>
                </SelectContent>
              )}
            </Select>

            <div className="flex gap-2 justify-between items-center">
              <div className="flex-">
                <Label className="text-sm">Amount</Label>
                <Input
                  type="number"
                  className="input"
                  placeholder="100"
                  value={data.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Your Prediction</Label>
                {selectedFixture ? (
                  <div className="flex justify-between gap-1">
                    {selectedFixture.outcomes.length > 2 ? (
                      <>
                        <Button
                          variant={"ghost"}
                          className="flex-1 border border-blue-500 bg-blue-500/20"
                        >
                          Home
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="flex-1 border border-blue-500 bg-blue-500/20"
                        >
                          Draw
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="flex-1 border border-blue-500 bg-blue-500/20"
                        >
                          Away
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant={"ghost"}
                          className="flex-1 border border-blue-500 bg-blue-500/20"
                        >
                          No
                        </Button>
                        <Button
                          variant={"ghost"}
                          className="flex-1 border border-blue-500 bg-blue-500/20"
                        >
                          Yes
                        </Button>
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <DialogFooter className="my-3 flex justify-between gap-1 px-2">
            <Button
              variant={"ghost"}
              className="flex justify-center w-full bg-red-500/10 text-red-700"
              type="submit"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant={"ghost"}
              className="flex justify-center w-full bg-blue-500 text-white"
              type="submit"
            >
              <CheckCircle />
              <span>Proceed</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
