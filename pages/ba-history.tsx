import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/BAHistory.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "../types/supabase";

type BA = Database["public"]["Tables"]["ba_history"]["Row"][];

export default function BAHistory() {
  const [test, setTest] = useState<BA | []>([]);
  const [BAInfo, setBAInfo] = useState([]);

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from("ba_history")
      .select(
        "*, ba(ba_id, boss_dmg, damage, id, ied, main_stat, player_job, player_name, range, time)"
      )
      .order("date", { ascending: false });
    if (data) {
      if (data.length > 0) {
        setTest(data);
      }
    }
  }, []);

  console.log("TEST", test);

  useEffect(() => {
    getData();
    //   need some kind of setter method to set the date selected
    //   or we can add an onclick, or make them buttons? for the dates
  }, [getData]);

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.BAContainer}>
        <div className={styles.dashHeader}>
          <h1>Battle Analysis History</h1>
          <Image
            src="/default_avatar.jpg"
            alt="pink bean avatar"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.BADetails}>
          <div className={styles.dateList}>
            <button className={styles.newBtn}>New +</button>
            {/* map over dates */}
            {test.map((date, idx) => (
              <button key={idx}>{date.date}</button>
            ))}
            {/* {console.log(test)} */}
          </div>
          <div className={styles.details}>
            {/* map over people who were in the BA */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
