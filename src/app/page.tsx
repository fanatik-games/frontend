import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Header from "@/components/header";
import Fixtures from "./fixtures/_components/fixtures";
import OngoingChallenges from "./fixtures/_components/challenges";
export default function Home() {
  return (
    <div>
      {/* header hapa */}
      <Header />
      <main className="flex flex-col-reverse md:flex-row container mx-auto gap-6">
        <div className="left min-w-96 max-w-md max-h-screen px-2 md:px-0">
          <h4 className="py-2 font-medium text-sm">Today &apos;s Fixtures</h4>
          <div className="fixtures-container border rounded-md">
            <ScrollArea className="h-[60vh]">
              <ScrollBar />
              <Fixtures />
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1 right px-2 md:px-0">
          <div className="">
            <OngoingChallenges />
          </div>
        </div>
      </main>
    </div>
  );
}
