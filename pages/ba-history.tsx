import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/BAHistory.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { stringify } from "querystring";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

interface BASingle {
  ba_id: number;
  boss_dmg?: string;
  damage?: string;
  id: number;
  ied?: string;
  main_stat?: string;
  player_job?: string;
  player_name?: string;
  range?: string;
  time?: string;
}
interface BA {
  date?: string;
  ba: BASingle;
}

// interface BA {}

export default function BAHistory() {
  //   const [datesList, setDatesList] = useState<BA[]>([
  //     {
  //       date: "",
  //       ba: [
  //         {
  //           ba_id: 999,
  //           boss_dmg: "",
  //           damage: "",
  //           id: 999,
  //           ied: "",
  //           main_stat: "",
  //           player_job: "",
  //           player_name: "",
  //           range: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //   ]);
  const [BAInfo, setBAInfo] = useState([]);

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from("ba_history")
      .select(
        "date, ba(ba_id, boss_dmg, damage, id, ied, main_stat, player_job, player_name, range, time)"
      )
      .order("date", { ascending: false });
    if (data) {
      console.log(data[0]);
      //   const test: BA = data[0];
      //   console.log("DATA", test);
      //   setDatesList(test);
    }
  }, []);

  useEffect(() => {
    getData();
    //   need some kind of setter method to set the date selected
    //   or we can add an onclick, or make them buttons? for the dates
  }, [getData]);

  console.log("WFEWEFWEFWEF", process.env.NEXT_PUBLIC_SUPABASE_URL);

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
            <button className={styles.active}>Nov. 29th 2021</button>
            {/* {datesList.map((date, idx) => (
              <button key={idx}>{date}</button>
            ))} */}
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
