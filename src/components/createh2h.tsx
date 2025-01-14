"use client";
import React, { useState } from "react";
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

type ChallengeData = {
  title: string;
  team: string;
  wager: string;
  amount: string;
  prediction: string;
};

const CreateH2h = () => {
  const [challenge, setChallenge] = useState<ChallengeData[]>([]);
  const [data, setData] = useState<ChallengeData>({
    title: "",
    team: "",
    wager: "",
    amount: "",
    prediction: "",
  });

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
    <div>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <h2>Create a head to head prediction</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Head to Head Prediction</DialogTitle>
              <DialogDescription>
                Fill in the details to create a head to head prediction
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 p-3">
                <label className="col-span-2">
                  Head to Head Challenge Title
                  <Input
                    type="text"
                    className="input"
                    placeholder="Ligi Mbayaa !!"
                    value={data.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </label>
                <label className="col-span-2">
                  Team Available for Prediction
                  <Select
                    value={data.team}
                    onValueChange={(value) => handleChange("team", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Manchester United Vs Bournmouth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Games Available</SelectLabel>
                        <SelectItem value="Manchester United Vs Bournemouth">
                          Manchester United Vs Bournmouth
                        </SelectItem>
                        <SelectItem value="Liverpool Vs Crystal Palace">
                          Liverpool Vs Crystal Palace
                        </SelectItem>
                        <SelectItem value="Chelsea Vs Arsenal">
                          Chelsea Vs Arsenal
                        </SelectItem>
                        <SelectItem value="Manchester City Vs Wolves">
                          Manchester City Vs Wolves
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
                <div className="flex justify-between items-center col-span-2 gap-4">
                  <label className="flex-1">
                    Wager In
                    <Select
                      value={data.wager}
                      onValueChange={(value) => handleChange("wager", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="FCPS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency Available</SelectLabel>
                          <SelectItem value="FCPS">FCPS</SelectItem>
                          <SelectItem value="ECPS">ECPs </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </label>
                  <label className="col-span-2">
                    Amount
                    <Input
                      type="number"
                      className="input"
                      placeholder="100"
                      value={data.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                    />
                  </label>
                </div>
                <label className="col-span-2">
                  Place Your Prediction
                  <Select
                    value={data.prediction}
                    onValueChange={(value) => handleChange("prediction", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Home Win" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Prediction Available</SelectLabel>
                        <SelectItem value="Home Win">Home Win</SelectItem>
                        <SelectItem value="Draw">Draw</SelectItem>
                        <SelectItem value="Away win">Away Win</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
              </div>
              <DialogFooter className="mt-4">
                <Button className="flex justify-center w-full" type="submit">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Display the created challenges */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Created Challenges</h3>
        {challenge.length === 0 ? (
          <p>No challenges created yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
            {challenge.map((challenge, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-gray-100 w-full"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">{challenge.title}</h4>
                  {/* after the game to be predicted is over the button should be disabled */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Join</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{challenge.title}</DialogTitle>
                        <div className="flex justify-between items-center">
                          <DialogDescription>
                            Deadline: Tue Jan 14 2025
                          </DialogDescription>
                          <DialogDescription>
                            Prediction: {challenge.prediction}
                          </DialogDescription>
                        </div>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Predict
                          </Label>
                          <div className="col-span-3 w-full">
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Home Win" />
                              </SelectTrigger>
                              <SelectContent className="col-span-3">
                                <SelectGroup>
                                  <SelectLabel>
                                    Prediction Available
                                  </SelectLabel>
                                  <SelectItem value="Home Win">
                                    Home Win
                                  </SelectItem>
                                  <SelectItem value="Draw">Draw</SelectItem>
                                  <SelectItem value="Away win">
                                    Away Win
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            placeholder="200"
                            className="col-span-3"
                            type="number"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Enter</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <p>Teams: {challenge.team}</p>
                  <p>Wager: {challenge.wager}</p>
                  <p>Amount: {challenge.amount}</p>
                  <p>Prediction: {challenge.prediction}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateH2h;
