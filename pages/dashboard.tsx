import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/comps/SideMenu";
import { domainToASCII } from "url";

interface DailyTime {
  hoursLeft: number;
  mins: number;
  secs: number;
}

interface WeeklyTime {
  days: number;
  hrs: number;
  mins: number;
  secs: number;
}

export default function Dashboard({ data }: any) {
  const calculateDaily = () => {
    const date = new Date();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    let hoursLeft;
    if (20 - hrs < 0) {
      hoursLeft = 20 - hrs + 24;
    } else hoursLeft = 20 - hrs;
    return {
      hoursLeft,
      mins: 59 - mins,
      secs: 59 - secs,
    };
  };

  const calculateWeekly = () => {
    const date = new Date();
    const day = date.getDay();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    let days;
    if (day - 3 < 0) {
      days = day - 3 + 7;
    } else days = day - 3;
    return {
      days,
      hrs: 20 - hrs,
      mins: 59 - mins,
      secs: 59 - secs,
    };
  };

  const [dailyTimeLeft, setDailyTimeLeft] = useState<DailyTime>(
    calculateDaily()
  );
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState<WeeklyTime>(
    calculateWeekly()
  );
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
    // const dailyTimer = setTimeout(() => {
    //   setDailyTimeLeft({ ...dailyTimeLeft, ...calculateDaily() });
    // }, 1000);
    // const weeklyTimer = setTimeout(() => {
    //   setWeeklyTimeLeft({ ...weeklyTimeLeft, ...calculateWeekly() });
    // }, 1000);
    // return () => {
    //   clearTimeout(dailyTimer);
    //   clearTimeout(weeklyTimer);
    // };
  }, [getProfile, router, user, dailyTimeLeft, weeklyTimeLeft]);

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
            <p>
              {character.Class} Rank {character.ClassRank}
            </p>
            <p>
              {character.Server} Rank {character.ServerClassRanking}
            </p>
            <p>Legion: {character.LegionLevel}</p>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.timeContainer}>
              <p>Time until reset</p>
              <h2>
                {dailyTimeLeft.hoursLeft.toString().length === 1
                  ? `0${dailyTimeLeft.hoursLeft}`
                  : `${dailyTimeLeft.hoursLeft}`}{" "}
                {dailyTimeLeft.mins.toString().length === 1
                  ? `0${dailyTimeLeft.mins}`
                  : `${dailyTimeLeft.mins}`}{" "}
                {dailyTimeLeft.secs.toString().length === 1
                  ? `0${dailyTimeLeft.secs}`
                  : `${dailyTimeLeft.secs}`}
              </h2>
              <p>Time until weekly reset</p>
              <h2>
                {weeklyTimeLeft.days.toString().length === 1
                  ? `0${weeklyTimeLeft.days}`
                  : `${weeklyTimeLeft.days}`}{" "}
                {weeklyTimeLeft.hrs.toString().length === 1
                  ? `0${weeklyTimeLeft.hrs}`
                  : `${weeklyTimeLeft.hrs}`}{" "}
                {weeklyTimeLeft.mins.toString().length === 1
                  ? `0${weeklyTimeLeft.mins}`
                  : `${weeklyTimeLeft.mins}`}{" "}
                {weeklyTimeLeft.secs.toString().length === 1
                  ? `0${weeklyTimeLeft.secs}`
                  : `${weeklyTimeLeft.secs}`}
              </h2>
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
  console.log("WEFOWEUFWOEFWE:FOEFH");
  const res = await fetch(
    "https://api.maplestory.gg/v2/public/character/gms/Murkuro"
  );
  const data = await res.json();
  return { props: { data } };
}
