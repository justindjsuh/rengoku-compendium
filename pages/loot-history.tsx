import SideMenu from "@/comps/SideMenu";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/LootHistory.module.css";
import { Database } from "@/types/supabase";
import Image from "next/image";
import { useState, useEffect } from "react";

type Boss_List = Database["public"]["Tables"]["bosses"]["Row"][];
type Boss = Database["public"]["Tables"]["bosses"]["Row"];

export default function LootHistory() {
  const [bossList, setBossList] = useState<Boss_List | []>([]);
  const [selectedBoss, setSelectedBoss] = useState<string>("");
  const [currentBossDetails, setCurrentBossDetails] = useState<Boss | {}>({});

  const handleBossClick = (bossName: Boss) => {
    setSelectedBoss(bossName.name);
    setCurrentBossDetails(bossName);
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
            {/* {BAInfo.length > 0 ? (
              <BASingle currentPlayer={currentPlayer} BAInfo={[...BAInfo]} />
            ) : currentUsername ? (
              <p>This user currently has no BA history</p>
            ) : (
              <p>Select a user to see details</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
