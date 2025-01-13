"use client";

import { H2HChallenge } from "@/components/h2h-challenge";

export type Fixture = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  outcomes: string;
  metadata: {
    date: Date;
  };
};
export function FixturesList({ fixtures }: { fixtures: Fixture[] }) {
  return (
    <>
      <h2>Today&apos;s top fixtures</h2>
      {fixtures.map((fixture) => (
        <H2HChallenge
          key={fixture.id}
          homeTeam={fixture.title.split("vs")[0]}
          awayTeam={fixture.title.split("vs")[1]}
          competition="FA cup"
          date={new Date(fixture.metadata.date).toDateString()}
          time={new Date(fixture.metadata.date).toTimeString()}
        />
      ))}
    </>
  );
}
