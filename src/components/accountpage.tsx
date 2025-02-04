"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, XCircle, Wallet, Copy } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import PayoutModal from "./payout";
import { API_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
const AccountPage = () => {
  const leaderboardData = [
    { rank: "#1", name: "Benji", amount: "Ksh 1000" },
    { rank: "#2", name: "Ayee Yooh", amount: "Ksh 950" },
    { rank: "#3", name: "You", amount: "Ksh 145" },
  ];

  interface UserData {
    balance: number;
    email: string;
    id: string;
    losses: number;
    participatedChallenges: number;
    phone: string;
    playthrough: {
      current: number;
      target: number;
    };
    referralCode: string;
    referralCount: number;
    username: string;
    wins: number;
  }

  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      try {
        const response = await fetch(API_URL + "/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        setIsLoading(false);
        setUserData(responseData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="">
      {userData && (
        <div className="space-y-2">
          <div className="p-2 space-y-2 bg-accent border border-muted/20 rounded-lg">
            <div className="flex items-center space-x-4 justify-between">
              <div>
                <h2 className="text-lg font-bold">{userData?.username}</h2>
                <p className="text-sm text-gray-600">{userData?.phone}</p>
              </div>
              <div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {userData?.username
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-4">
              <div className="balance my-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="bal flex items-center gap-2">
                    <span className="flex items-center text-gray-700">
                      <Wallet className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="text-xl">Balance:</span>
                    </span>
                    <span className=" text-xl">{userData?.balance}.00 FC</span>
                  </div>
                  <div className="limit text-xs">
                    <span>Min. Withdraw Amount 500 FC</span>
                  </div>
                </div>
                <div className=" text-center">
                  <PayoutModal />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-700">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />{" "}
                  Participated Challenges:
                </span>
                <span className="font-semibold">
                  {userData?.participatedChallenges}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-700">
                  <Trophy className="w-5 h-5 mr-2 text-blue-500" /> Wins:
                </span>
                <span className="font-semibold">
                  {userData?.participatedChallenges}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-700">
                  <XCircle className="w-5 h-5 mr-2 text-red-500" /> Losses:
                </span>
                <span className="font-semibold"> {userData?.losses}</span>
              </div>
            </div>
            <div className="my-2">
              <div className="rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800">
                  Achieve this to withdraw
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-700">
                      Earn ksh 1000 to be able to withdraw
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Ksh145 Earned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-2 rounded-lg max-w-md w-full space-y-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium mb-2">
                Your Referral Link
              </p>
              <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2">
                <span className="text-xs text-gray-600 truncate">
                  https://fantitk.com/auth?referral-code=12ICKGLG
                </span>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-800 font-medium">Your Referral Code</p>
                <span className="text-gray-600 text-sm">
                  {userData?.referralCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">Total Referrals</p>
                <span className="text-gray-600 text-sm">
                  {userData?.referralCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
