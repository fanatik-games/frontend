import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function UserNav({ user }: { user?: User }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getUserName = (user: User) => {
    if (!user) return "Guest";
    if (user.user_metadata && user.user_metadata.name) {
      return user.user_metadata.name;
    }

    return "Anonymous: " + user.id.split("-")[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 border w-9 h-9 rounded-full">
          <Image
            className="rounded-full"
            width={100}
            height={100}
            src="https://api.dicebear.com/9.x/lorelei/png?seed=felix"
            alt="user-avatar"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-mono">
              <span className="text-xs">{getUserName(user!)}</span>
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ? user.email : user?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem className="flex flex-col justify-start items-start">
              <span className="text-base text-neutral-600">Account</span>
              <span className="text-xs text-neutral-500 font-medium">
                This is where you will be able to access your account
                information.
              </span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Link href="/settings" className="text-base text-neutral-600">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            onClick={async () => {
              setIsLoggingOut(true);
              await supabase.auth.signOut();
              setIsLoggingOut(false);
            }}
            className="w-full justify-start px-0 py-0 h-auto"
          >
            {isLoggingOut ? (
              <div className="flex gap-1 items-center justify-center">
                <Loader2 /> Please wait..
              </div>
            ) : (
              "Logout"
            )}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
