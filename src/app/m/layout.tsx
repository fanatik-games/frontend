import Header from "@/components/header";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      {children}
      <div className="bottom-0 fixed container">
        <div className="flex justify-between ">
          <Link
            className=" flex-1 bg-primary text-center py-2 text-muted"
            href={"fixtures"}
          >
            Fixtures
          </Link>
          <Link
            className=" flex-1 bg-muted text-center py-2 text-primary"
            href={"duels"}
          >
            Duels
          </Link>
          <Link
            className=" flex-1 bg-primary-foreground text-center py-2 text-primay"
            href={"account"}
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
