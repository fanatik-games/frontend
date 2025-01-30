import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Header from "@/components/header";
import Fixtures from "./fixtures/_components/fixtures";
import OngoingChallenges from "./fixtures/_components/challenges";
import OngoingDuels from "./fixtures/_components/ongoingDuels";
export default function Home() {
  return (
    <div>
      {/* header hapa */}
      <Header />
      <main className="flex container flex-col h-fit md:flex-row mx-auto w-full gap-6 py-3">
        <div className="md:px-0 min-w-[320px]">
          <h4 className="py-2 font-semibold text-2xl ">
            Today &apos;s Fixtures
          </h4>
          <div className="fixtures-container border rounded-md ">
            <ScrollArea className="h-[80vh]">
              <ScrollBar />
              <Fixtures />
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="">
            <OngoingChallenges />
          </div>
        </div>
        <div className="">
          <OngoingDuels />
        </div>
      </main>
    </div>
  );
}
