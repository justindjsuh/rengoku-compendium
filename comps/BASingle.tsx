import styles from "@/styles/BASingle.module.css";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Database } from "../types/supabase";

type BA = Database["public"]["Tables"]["ba_history"]["Row"][];

interface Single_User {
  username: string;
  player_job: string;
}
interface BA_Props {
  BAInfo: BA;
  currentPlayer: Single_User;
}

export const BASingle: React.FC<BA_Props> = ({ BAInfo, currentPlayer }) => {
  return (
    <div className={styles.baSingleContainer}>
      {BAInfo.map((ba, idx) => (
        <div key={idx} className={styles.singleBAContainer}>
          <div className={styles.BAHeader}>
            <p>
              {currentPlayer.username} <span>({currentPlayer.player_job})</span>
            </p>
            <div className={styles.timer}>
              <FontAwesomeIcon
                icon={faStopwatch}
                size="lg"
                style={{ color: "#e8e8e8" }}
              />
              <p>{ba.time}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Damage</th>
                <th>IED</th>
                <th>Boss%</th>
                <th>Main Stat</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ba.damage ? ba.damage : "N/A"}</td>
                <td>{ba.ied ? ba.ied : "N/A"}</td>
                <td>{ba.boss_dmg ? ba.boss_dmg : "N/A"}</td>
                <td>{ba.main_stat ? ba.main_stat : "N/A"}</td>
                <td>{ba.range ? ba.range : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
