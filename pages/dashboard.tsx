import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/comps/SideMenu";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

export default function Dashboard() {
  const calculateDaily = () => {
    const date = new Date();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    let hoursLeft;
    if (20 - hrs < 0) {
      hoursLeft = 19 - hrs + 24;
    } else hoursLeft = 19 - hrs;
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
    if (3 - day < 0) {
      days = 10 - day;
    } else days = day - 3;
    return {
      days,
      hrs: 19 - hrs,
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
    const dailyTimer = setTimeout(() => {
      setDailyTimeLeft({ ...dailyTimeLeft, ...calculateDaily() });
    }, 1000);
    const weeklyTimer = setTimeout(() => {
      setWeeklyTimeLeft({ ...weeklyTimeLeft, ...calculateWeekly() });
    }, 1000);
    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(weeklyTimer);
    };
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
            <p>Avatar Container</p>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.timeContainer}>
              <p>Time until reset</p>
              <h2>
                {dailyTimeLeft.hoursLeft.toString().length === 1
                  ? `0${dailyTimeLeft.hoursLeft}h`
                  : `${dailyTimeLeft.hoursLeft}h`}{" "}
                {dailyTimeLeft.mins.toString().length === 1
                  ? `0${dailyTimeLeft.mins}m`
                  : `${dailyTimeLeft.mins}m`}{" "}
                {dailyTimeLeft.secs.toString().length === 1
                  ? `0${dailyTimeLeft.secs}s`
                  : `${dailyTimeLeft.secs}s`}
              </h2>
              <p>Time until weekly reset</p>
              <h2>
                {weeklyTimeLeft.days.toString().length === 1
                  ? `0${weeklyTimeLeft.days}d`
                  : `${weeklyTimeLeft.days}d`}{" "}
                {weeklyTimeLeft.hrs.toString().length === 1
                  ? `0${weeklyTimeLeft.hrs}h`
                  : `${weeklyTimeLeft.hrs}h`}{" "}
                {weeklyTimeLeft.mins.toString().length === 1
                  ? `0${weeklyTimeLeft.mins}m`
                  : `${weeklyTimeLeft.mins}m`}{" "}
                {weeklyTimeLeft.secs.toString().length === 1
                  ? `0${weeklyTimeLeft.secs}s`
                  : `${weeklyTimeLeft.secs}s`}
              </h2>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.eventsContainer}>
                <div className={styles.eventsHeader}>
                  <h2>Upcoming Events</h2>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2xl"
                    style={{ color: "#e8e8e8" }}
                  />
                </div>
              </div>
              <div className={styles.membersContainer}>
                <div className={styles.membersHeader}>
                  <h2>Guild Members</h2>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2xl"
                    style={{ color: "#e8e8e8" }}
                  />
                </div>
                <div className={styles.membersContent}>
                  <p>Pantimos</p>
                  <p>Pantimos</p>
                  <p>Pantimos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  //   const res = await fetch(
  //     "https://api.maplestory.gg/v2/public/character/gms/Murkuro"
  //   );
  //   const data = await res.json();
  //   return { props: { data } };
}
