"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyUserAccount } from "@/lib/helpers";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsernamePrompt({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.data) {
        setAuthToken(res.data.session?.access_token ?? "");
      }
    });
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent className="rounded-lg p-2 border border-accent max-w-sm h-fit">
        <DialogTitle>Enter your username</DialogTitle>
        <div className="space-y-2">
          <Label>Choose a name</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ex: mzeemzima"
            className="w-full"
          />
          <Button
            size={"sm"}
            onClick={() => {
              if (!username) return;
              setSavingUsername(true);
              verifyUserAccount(authToken ?? "", username).then((res) => {
                if (res) {
                  setOpen(false);
                  setSavingUsername(false);
                  setUsername("");
                  router.push("/");
                }
              });
            }}
            disabled={savingUsername}
            className="h-8 w-full my-2"
          >
            {savingUsername ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
