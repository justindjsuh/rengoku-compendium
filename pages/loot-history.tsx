import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/LootHistory.module.css";
import Image from "next/image";

export default function LootHistory() {
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
          <div></div>
        </div>
      </div>
    </div>
  );
}
