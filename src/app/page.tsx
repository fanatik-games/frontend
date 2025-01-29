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
      <main className="flex flex-col  md:flex-row  mx-auto w-full  gap-6 px-4">
        <div className="md:px-0">
          <h4 className="py-2 font-semibold text-2xl ">
            Today &apos;s Fixtures
          </h4>
          <div className="fixtures-container border rounded-md w-fit">
            <ScrollArea className="h-[80vh]">
              <ScrollBar />
              <Fixtures />
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1 right px-2 md:px-0 w-[90%]">
          <div className="">
            <OngoingChallenges />
          </div>
        </div>
        <div className="w-fit">
          <OngoingDuels />
        </div>
      </main>
    </div>
  );
}
