import SideMenu from "@/comps/SideMenu";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/LootHistory.module.css";
import { Database } from "@/types/supabase";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BossDetails } from "../comps/BossDetails";

type Boss_List = Database["public"]["Tables"]["bosses"]["Row"][];
type Boss = Database["public"]["Tables"]["bosses"]["Row"];

export default function LootHistory() {
  const [bossList, setBossList] = useState<Boss_List | []>([]);
  const [selectedBoss, setSelectedBoss] = useState<string>("");
  const [btnIndex, setBtnIndex] = useState<number>(0);
  const [currentBossDetails, setCurrentBossDetails] = useState<Boss>({
    id: 0,
    name: "",
    banner: "",
    order: 0,
  });

  const handleBossClick = (bossName: Boss) => {
    setSelectedBoss(bossName.name);
    setCurrentBossDetails(bossName);
    setBtnIndex(0);
  };

  const getBosses = async () => {
    const { data, error } = await supabase
      .from("bosses")
      .select("*")
      .order("order", { ascending: true });
    if (data) {
      setBossList(data);
    }
  };

  useEffect(() => {
    getBosses();
  }, []);

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.lootContainer}>
        <div className={styles.dashHeader}>
          <h1>Loot History</h1>
          <Image
            src="/default_avatar.jpg"
            alt="pink bean avatar"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.lootDetails}>
          <div className={styles.bossList}>
            {/* map over bosses */}
            {bossList.map((boss, idx) => {
              return (
                <button
                  className={
                    selectedBoss === boss.name ? `${styles.active}` : ""
                  }
                  key={idx}
                  onClick={() => handleBossClick(boss)}
                >
                  {boss.name}
                </button>
              );
            })}
          </div>
          <div className={styles.details}>
            {selectedBoss ? (
              <BossDetails
                currentBossDetails={currentBossDetails}
                btnIndex={btnIndex}
                setBtnIndex={setBtnIndex}
              />
            ) : (
              <p className={styles.detailsEmpty}>
                Select a boss to see details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
