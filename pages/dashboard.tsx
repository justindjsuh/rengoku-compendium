import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  });

  return <h1>DASHBOARD</h1>;
}
