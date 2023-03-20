import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/comps/SideMenu";

export default function Dashboard({ data }: any) {
  const character = data.CharacterData;
  const [profile, setProfile] = useState<{ username: string } | null>({
    username: "",
  });
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const getProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("auth_id", user?.id)
      .single();
    setProfile(data);
  }, [supabase, user?.id]);

  useEffect(() => {
    if (!user) router.push("/");
    if (user) getProfile();
  }, [getProfile, router, user]);

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.dashContainer}>
        <div className={styles.dashHeader}>
          <h1>Welcome back, {profile?.username}</h1>
          <Image
            src="/default_avatar.jpg"
            alt="pink bean avatar"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.dashDetails}>
          <div className={styles.avatarContainer}>
            <Image
              src={character.CharacterImageURL}
              alt="character avatar"
              width={150}
              height={150}
            />
            <p className={styles.avatarName}>{character.Name}</p>
            <p>
              Level {character.Level} ({character.EXPPercent}
              %)
            </p>
            <p>Class: {character.Class}</p>
            <p>Rank: {character.ClassRank}</p>
            <p>Legion: {character.LegionLevel}</p>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.timeContainer}>
              <p>Time until reset</p>
              <p>Time until weekly reset</p>
            </div>
            <div className={styles.eventsContainer}>
              <p>Upcoming Events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.maplestory.gg/v2/public/character/gms/Murkuro"
  );
  const data = await res.json();
  return { props: { data } };
}
