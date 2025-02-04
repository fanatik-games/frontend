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
import { supabase } from "@/lib/supabase";
const AccountPage = () => {
  const leaderboardData = [
    { rank: "#1", name: "Benji", amount: "Ksh 1000" },
    { rank: "#2", name: "Ayee Yooh", amount: "Ksh 950" },
    { rank: "#3", name: "You", amount: "Ksh 145" },
  ];
  const [user, setUser] = useState({
    name: "",
    phone: "",
    walletBalance: "",
    challengesParticipated: 0,
    wins: 0,
    losses: 0,
  });
  const [user_id, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        console.log(session.user, "session user");
        const getUser = async () => {
          try {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (error) throw error;

            if (data) {
              // console.log(data, "user data");
              setUser({
                name: data.name,
                phone: data.phone,
                walletBalance: data.fc_balance,
                challengesParticipated: data.challenges_participated,
                wins: data.wins,
                losses: data.losses,
              });
            }
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };

        getUser();
      }
    };
    fetchSession();
  }, []);
  return (
    // p-4 min-h-screen
    <div className="">
      {/* kaprofile x activities x notification */}
      <div className="space-y-2">
        {/* profile */}
        <div className="p-2 space-y-2 bg-accent border border-muted/20 rounded-lg">
          <div className="flex items-center space-x-4 justify-between">
            <div>
              <h2 className="text-lg font-bold">Anto Ducci</h2>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
            <div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-blue-500 text-white">
                  AD
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
                  <span className=" text-xl">{user.walletBalance} FC</span>
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
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> Participated
                Challenges:
              </span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-700">
                <Trophy className="w-5 h-5 mr-2 text-blue-500" /> Wins:
              </span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-700">
                <XCircle className="w-5 h-5 mr-2 text-red-500" /> Losses:
              </span>
              <span className="font-semibold">4</span>
            </div>
          </div>
          {/* goals */}
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
        {/* activities X notification */}

        {/* invite */}
        <div className="bg-gray-100 p-2 rounded-lg max-w-md w-full space-y-2">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium mb-2">Your Referral Link</p>
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
              <span className="text-gray-600 text-sm">12ICKGLG</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-medium">Total Referrals</p>
              <span className="text-gray-600 text-sm">2</span>
            </div>
          </div>
          {/* achievenent for refering */}
        </div>
      </div>
      {/* leaderboard */}
    </div>
  );
};

export default AccountPage;
