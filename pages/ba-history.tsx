import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/BAHistory.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BAHistory() {
  const [datesList, setDatesList] = useState([]);
  const [BAInfo, setBAInfo] = useState(null);

  useEffect(() => {
    // need some kind of setter method to set the date selected
    // or we can add an onclick, or make them buttons? for the dates
  }, []);

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
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
            <button>Nov. 29th 2021</button>
          </div>
          <div className={styles.details}></div>
        </div>
      </div>
    </div>
  );
}
