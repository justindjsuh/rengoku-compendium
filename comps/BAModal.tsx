import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/ModalBA.module.css";
import { Database } from "@/types/supabase";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction, useState } from "react";

type BA = Database["public"]["Tables"]["ba_history"]["Row"][];
interface Single_User {
  username: string;
  player_job: string;
  id: number;
}

interface BAModal_Props {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setBAInfo: React.Dispatch<SetStateAction<BA>>;
  getData: () => void;
  currentPlayer: Single_User;
  BAInfo: BA;
}

export const BAModal: React.FC<BAModal_Props> = ({
  setShowModal,
  setBAInfo,
  getData,
  currentPlayer,
  BAInfo,
}) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [ied, setIED] = useState<string>("");
  const [bossPercent, setBossPercent] = useState<string>("");
  const [mainStat, setMainStat] = useState<string>("");
  const [lowerRange, setLowerRange] = useState<string>("");
  const [upperRange, setUpperRange] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const range = `${lowerRange} ~ ${upperRange}`;
    const res = await supabase
      .from("ba_history")
      .insert({
        date,
        time,
        damage,
        ied,
        boss_dmg: bossPercent,
        main_stat: mainStat,
        user_id: currentPlayer.id,
        player_name: currentPlayer.username,
        range,
      })
      .select();

    if (res.data) {
      const { data, error } = await supabase
        .from("ba_history")
        .select("*")
        .eq("player_name", currentPlayer.username)
        .order("date", { ascending: false });
      if (data) {
        const newData = [...BAInfo, ...res.data];
        setBAInfo(newData);
      }
    }
    setShowModal(false);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.playerInfo}>
            <p>
              {currentPlayer.username} <span>({currentPlayer.player_job})</span>
            </p>
            <p>Battle Analysis Entry</p>
          </div>
          <FontAwesomeIcon
            onClick={() => setShowModal(false)}
            icon={faXmark}
            size="lg"
            style={{ color: "#e8e8e8" }}
          />{" "}
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.dateDiv}>
              <input
                type="date"
                placeholder="Date"
                className={styles.date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Time"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Damage"
                onChange={(e) => setDamage(e.target.value)}
              />
              <input
                type="text"
                placeholder="IED"
                onChange={(e) => setIED(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Boss%"
                onChange={(e) => setBossPercent(e.target.value)}
              />
              <input
                type="text"
                placeholder="Main Stat"
                onChange={(e) => setMainStat(e.target.value)}
              />
            </div>
            <div className={styles.rangeInputs}>
              <input
                type="text"
                placeholder="Lower Range"
                onChange={(e) => setLowerRange(e.target.value)}
              />
              <p>~</p>
              <input
                type="text"
                placeholder="Upper Range"
                onChange={(e) => setUpperRange(e.target.value)}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className={styles.modalFooter}></div>
      </div>
      <div className={styles.modalBg}></div>
    </div>
  );
};
