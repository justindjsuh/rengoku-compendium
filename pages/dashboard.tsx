import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/comps/SideMenu";

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  });

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.dashContainer}></div>
    </div>
  );
}
