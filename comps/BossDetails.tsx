import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "@/styles/BossDetails.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Boss_Details = Database["public"]["Tables"]["bosses"]["Row"];
type Boss_Difficulties =
  Database["public"]["Tables"]["boss_difficulty"]["Row"][];
type Clear_History =
  | Database["public"]["Tables"]["clear_history"]["Row"]
  | null;
type Loot_History = Database["public"]["Tables"]["loot_history"]["Row"];

type Clear = Clear_History & { loot_history: Loot_History[] };

interface Boss_Props {
  currentBossDetails: Boss_Details;
  btnIndex: number;
  setBtnIndex: Dispatch<SetStateAction<number>>;
}

export const BossDetails: React.FC<Boss_Props> = ({
  currentBossDetails,
  btnIndex,
  setBtnIndex,
}) => {
  const [bossDifficulties, setBossDifficulties] = useState<
    Boss_Difficulties | []
  >([]);
  const [clearHistory, setClearHistory] = useState<any>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("");

  const handleDifficultyClick = (difficulty: string, idx: number) => {
    setCurrentDifficulty(difficulty);
    setBtnIndex(idx);
  };
  console.log(btnIndex);
  const getBossDetails = useCallback(async () => {
    const { data, error } = await supabase
      .from("boss_difficulty")
      .select("*")
      .eq("boss_id", currentBossDetails.id);
    if (data) {
      setBossDifficulties(data);
      setCurrentDifficulty(data[0].difficulty);

      const promises = data.map(async (difficulty) => {
        const { data } = await supabase
          .from("clear_history")
          .select("*, loot_history(*)")
          .eq("difficulty_id", difficulty.id);
        return data;
      });

      const bossData = await Promise.all(promises);
      if (bossData) {
        setClearHistory(bossData);
      }
    }
  }, [currentBossDetails.id]);

  useEffect(() => {
    getBossDetails();
  }, [getBossDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image
          src={currentBossDetails.banner}
          alt="boss banner"
          height={300}
          width={1200}
        />
        <div className={styles.difficultyBtns}>
          {bossDifficulties.map((difficulty, idx) => (
            <button
              className={
                currentDifficulty === difficulty.difficulty ? styles.active : ""
              }
              key={idx}
              onClick={() => handleDifficultyClick(difficulty.difficulty, idx)}
            >
              {difficulty.difficulty}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.clears}>
        <button className={styles.addBtn}>
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            style={{ color: "#e8e8e8" }}
          />
        </button>
        {clearHistory ? (
          clearHistory[btnIndex]?.length === 0 ? (
            <p className={styles.detailsEmpty}>No clears recorded yet</p>
          ) : null
        ) : null}
        {clearHistory
          ? clearHistory[btnIndex]?.map((clear: Clear, idx: number) => (
              <div key={idx} className={styles.clearContainer}>
                <div className={styles.clearHeader}>
                  <p>{clear?.date}</p>
                  <p>{clear?.sweeper} Sweep</p>
                </div>
                {clear.loot_history.length > 0 ? (
                  clear?.loot_history.map((loot: Loot_History, idx: number) => (
                    <div className={styles.lootEntry} key={idx}>
                      <p key={idx}>{loot.item_name}</p>
                      <p>{loot.owner}</p>
                    </div>
                  ))
                ) : (
                  <div className={styles.lootEntry}>
                    <p>No Drops</p>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
