"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useRealtime from "@/hooks/useRealtime";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import React from "react";

export default function AccountTopUp({ user }: { user?: User }) {
  const [toppingUp, isToppingUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone ?? "");
  const [amount, setAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { data } = useRealtime();
  const { session } = useAuth();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    isToppingUp(true);
    try {
      const request = await fetch(API_URL + "/payments/initiate/purchase", {
        method: "post",
        body: JSON.stringify({ phoneNumber, amount }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (!request.ok) {
        const error = await request.json();
        console.log("ayeh", error.message);
        throw new Error(error.message);
      }
      const res = await request.json();
      console.log("Purchase response", res);
      toast.success("Purchase initiated successfully");
    } catch (error) {
      toast.error(
        "Error occured while topping up, try again later. Reason " +
          (error as Error).message,
      );
    } finally {
      isToppingUp(false);
    }

    isToppingUp(false);
  };

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

        setUserData(responseData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (data) {
      const event = data.event;
      if (event === "PURCHASE_CONFIRMED") {
        console.log("Purchase confirmed", data.data);
        // proceed to close the purchase dialog;
        const tx = data.data;
        if (tx.phoneNumber === phoneNumber) setOpenDialog(false);
      }
    }
  }, [data]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center bg-blue-500/10 rounded-lg justify-between flex-row px-1 py-2"
        >
          <Image
            width="25"
            height="25"
            src="https://img.icons8.com/arcade/64/coins--v1.png"
            alt="coins--v1"
          />
          <span className="font-semibold text-xs font-mono">
            {userData?.balance}.00 FC
          </span>
          <div className="w-6 h-6 flex justify-center items-center bg-blue-500 text-white rounded-md">
            <Plus />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="py-4 px-3 !rounded-xl border border-accent max-w-sm">
        <DialogHeader className="flex flex-row items-center">
          <DialogTitle className="flex justify-between items-center">
            Buy Coins
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm">
          To buy coins, enter your phone number and desired amount, then proceed
          to complete the transaction.
        </DialogDescription>
        <div>
          <form onSubmit={handlePurchase}>
            <div className="grid gap-2">
              <div className="input-group">
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Example: 0720234345"
                />
              </div>
              <div className="input-group">
                <Label>Enter Amount</Label>
                <Input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  id="amount"
                  placeholder="Example: 300"
                />
              </div>
              <div className="info text-xs bg-accent/50 p-2 rounded-md border border-muted font-mono">
                After you hit proceed, give it a few seconds for the stk push to
                be sent to your mobile
              </div>
              <Button
                disabled={toppingUp}
                variant={"default"}
                className="w-full"
                type="submit"
              >
                {toppingUp ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Loader2 className="animate-spin" />
                    <p>Please wait...</p>
                  </div>
                ) : (
                  "Proceed"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
