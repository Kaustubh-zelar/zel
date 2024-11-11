

import { getDesc } from "@/actions";
import Dashboard from "./new_client";

export default async function Home() {
  const Text = await getDesc();
  console.log(Text, "Text data");
  return (
    <Dashboard announcements={Text} />
  )
}