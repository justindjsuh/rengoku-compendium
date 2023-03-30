import { BAModal } from "@/comps/BAModal";
import { BASingle } from "@/comps/BASingle";
import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/BAHistory.module.css";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "../types/supabase";

type BA = Database["public"]["Tables"]["ba_history"]["Row"][];

type BA_Single = {
  ba_id: number;
  boss_dmg: string | null;
  created_at: string | null;
  damage: string | null;
  id: number;
  ied: string | null;
  main_stat: string | null;
  player_job: string | null;
  player_name: string;
  range: string | null;
  time: string | null;
};

type BA_History = {
  created_at: string | null;
  date: string;
  id: number;
  ba?: BA_Single[];
};

export default function BAHistory() {
  const [dateList, setDateList] = useState<BA | []>([]);
  const [BAInfo, setBAInfo] = useState<BA_Single[] | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  const handleDateClick = (BAinfo: BA_History) => {
    if (BAinfo.ba) {
      setBAInfo(BAinfo.ba);
      setCurrentDate(BAinfo.date);
    }
  };

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from("ba_history")
      .select(
        "*, ba(ba_id, boss_dmg, damage, id, ied, main_stat, player_job, player_name, range, time)"
      )
      .order("date", { ascending: false });
    if (data) {
      if (data.length > 0) {
        setDateList(data);
      }
    }
  }, []);

  const handleAddBA = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles.container}>
      <SideMenu />
      {showModal ? (
        <BAModal setShowModal={setShowModal} getData={getData} />
      ) : null}
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
            <button className={styles.newBtn} onClick={handleAddBA}>
              New +
            </button>
            {/* map over dates */}
            {dateList.map((date, idx) => {
              return (
                <button
                  className={
                    currentDate === date.date ? `${styles.active}` : ""
                  }
                  key={idx}
                  onClick={() => handleDateClick(date)}
                >
                  {date.date}
                </button>
              );
            })}
          </div>
          <div className={styles.details}>
            {/* map over people who were in the BA */}
            {BAInfo.length > 0 ? (
              <BASingle BAInfo={[...BAInfo]} />
            ) : (
              <p>Select a date to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
