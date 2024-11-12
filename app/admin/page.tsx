import { getDesc } from "@/actions";

import AdminSettings from "./for_props";

export default async function Admin() {
  const Text = await getDesc();
  console.log(Text, "Text data");
  return (
    <AdminSettings description={Text} />
  )
}