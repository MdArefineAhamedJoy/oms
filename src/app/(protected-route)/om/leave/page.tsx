import { redirect } from "next/navigation";

export default function Page() {
  // Default to the Overview tab
  redirect("/om/leave/overview");
}
