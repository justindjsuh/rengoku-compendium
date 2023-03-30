import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/ModalBA.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction, useState } from "react";

interface BAModal_Props {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  getData: () => void;
}

export const BAModal: React.FC<BAModal_Props> = ({ setShowModal, getData }) => {
  const [date, setDate] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [playerJob, setPlayerJob] = useState<string>("");
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

    const { data, error } = await supabase
      .from("ba_history")
      .select("*")
      .eq("date", date)
      .single();
    if (data) {
      const reqObj = {
        ba_id: data.id,
        player_name: playerName,
        player_job: playerJob,
        time,
        damage,
        ied,
        boss_dmg: bossPercent,
        main_stat: mainStat,
        range,
      };
      const res = await supabase.from("ba").insert(reqObj).select("*");
    } else {
      const { data, error } = await supabase
        .from("ba_history")
        .insert({
          date,
        })
        .select();

      if (data) {
        const reqObj = {
          ba_id: data[0].id,
          player_name: playerName,
          player_job: playerJob,
          time,
          damage,
          ied,
          boss_dmg: bossPercent,
          main_stat: mainStat,
          range,
        };
        const res = await supabase.from("ba").insert(reqObj).select("*");
      }
    }
    setShowModal(false);
    getData();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p>Battle Analysis</p>
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
                placeholder="Player Name"
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Player Job"
                onChange={(e) => setPlayerJob(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Time"
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="Damage"
                onChange={(e) => setDamage(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="IED"
                onChange={(e) => setIED(e.target.value)}
              />
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
