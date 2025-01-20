import React from "react";
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
import { Trophy, XCircle, Wallet } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
const AccountPage = () => {
  return (
    <div className="p-4 min-h-screen">
      {/* kaprofile x activities x notification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* profile */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <div className="flex items-center space-x-4 justify-between">
            <div>
              <h2 className="text-lg font-bold">Anto Ducci</h2>
              <p className="text-sm text-gray-600">0710 234 859</p>
            </div>
            <div>
              <Avatar className="w-12 h-12">
                <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-blue-500 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-700">
                <Wallet className="w-5 h-5 mr-2 text-blue-500" /> Balance:
              </span>
              <span className="font-semibold">145.00</span>
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
          <div className="mt-6 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md w-full">
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 bg-white shadow-lg rounded-md border border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-md font-semibold text-gray-800">
                    Withdraw Funds
                  </DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Make a withdrawal here. Click confirm when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="mb-4">
                  <Label
                    className="block text-sm text-gray-700 mb-1"
                    htmlFor="withdraw-amount"
                  >
                    Amount
                  </Label>
                  <Input
                    type="number"
                    id="withdraw-amount"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="100"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-green-500 text-white hover:bg-green-600 w-full"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* activities X notification */}
        <div className="flex flex-col space-y-4 items-center">
          {/* activities */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activities
            </h2>
            <ul className="space-y-4">
              {[
                {
                  label: "Withdrawal:",
                  date: "Jan 18, 2025",
                  amount: "-Ksh 500",
                  amountStyle: "text-red-600",
                },
                {
                  label: "Participated:",
                  date: "Jan 15, 2025",
                  amount: "Completed",
                  amountStyle: "text-yellow-500",
                },
                {
                  label: "Invite Reward:",
                  date: "Jan 10, 2025",
                  amount: "+Ksh 450",
                  amountStyle: "text-blue-600",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-800"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className={`${item.amountStyle} font-semibold`}>
                    {item.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* notification */}
          <div className="bg-white p-4 rounded-lg shadow-sm m-6 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Notifications
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white p-2 rounded-full">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-gray-700">
                  New challenge: Win 3 Matches is now available!
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-yellow-500 text-white p-2 rounded-full">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-gray-700">
                  Withdrawal request of ksh 1000 has been sent.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* invite */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md md:flex-1 mt-4">
          <div className="flex items-center mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
              <AvatarFallback className="bg-blue-500 text-white">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-800">
                Hi there, Anthony! 👋🏻
              </h1>
              <p className="text-gray-600 text-sm md:text-md">
                Invite your friends and earn rewards instantly!
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <p className="text-gray-800 font-medium mb-2">Your Referral Link</p>
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2">
              <span className="text-xs md:text-sm text-gray-600 truncate">
                https://fantitk.com/auth?referral-code=12ICKGLG
              </span>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Copy
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
              <span className="text-gray-600 text-sm">0</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-medium">FCPs Coins Earned</p>
              <span className="text-gray-600 text-sm">0</span>
            </div>
          </div>
        </div>
      </div>
      {/* goals */}
      <div>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Your Goals
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-700">
                Refer 10 Friends And Earn extra ksh 500
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                2/10 Friends Referred
              </p>
            </div>
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
              <p className="text-sm text-gray-500 mt-1">$145 Earned</p>
            </div>
          </div>
        </div>
      </div>
      {/* leaderboard */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Leaderboard
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between text-gray-700">
            <span>#1 Benji</span>
            <span className="text-green-600 font-semibold">Ksh 1000</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>#2 Ayee Yooh</span>
            <span className="text-green-600 font-semibold">Ksh 950</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>#3 You</span>
            <span className="text-green-600 font-semibold">Ksh 145</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountPage;
