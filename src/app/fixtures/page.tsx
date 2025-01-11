import { supabase } from "@/lib/supabase";
import { Fixture, FixturesList } from "./fixtures-list";

export default async function FixturesPage() {
  const { data } = await supabase.from("fixtures").select();
  return <FixturesList fixtures={data as Fixture[]} />;
}
