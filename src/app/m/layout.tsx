import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      {children}
      <div className="bottom-0 fixed container">
        <div className="flex justify-between p-1">
          <Link href={"fixtures"}>Fixtures</Link>
          <Link href={"challenges"}>Duels</Link>
          <Link href={"profile"}>Profile</Link>
        </div>
      </div>
    </div>
  );
}
