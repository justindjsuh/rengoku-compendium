import styles from "@/styles/SideMenu.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faAddressBook,
  faCalendar,
  faChartArea,
  faChartSimple,
  faGear,
  faHouse,
  faLink,
  faMoneyBill,
  faRightFromBracket,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function SideMenu() {
  const route = useRouter().pathname;
  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideHeader}>
        <Image src="/logo.png" alt="fire logo" width={50} height={65} />
        <div>
          <p>Rengoku</p>
          <p>Compendium</p>
        </div>
      </div>
      <div className={styles.mainMenu}>
        <p className={styles.menuTitle}>MAIN MENU</p>
        <div
          className={`${styles.navItem} ${
            route === "/dashboard" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faHouse} style={{ color: "#adadad" }} />
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/spending" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#adadad" }} />
          <Link href="/spending">Spending</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/events" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faCalendar} style={{ color: "#adadad" }} />
          <Link href="/events">Events</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/rates-calculator" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#adadad" }} />
          <Link href="/rates-calculator">Rates Calculator</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/useful-links" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faLink} style={{ color: "#adadad" }} />
          <Link href="/useful-links">Useful Links</Link>
        </div>
      </div>
      <div className={styles.guildMenu}>
        <p className={styles.menuTitle}>GUILD</p>
        <div
          className={`${styles.navItem} ${
            route === "/members" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faAddressBook} style={{ color: "#adadad" }} />
          <Link href="/members">Members</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/ba-history" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faChartArea} style={{ color: "#adadad" }} />
          <Link href="/ba-history">BA History</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/loot-history" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faSackDollar} style={{ color: "#adadad" }} />
          <Link href="/loot-history">Loot History</Link>
        </div>
      </div>
      <div className={styles.bottomMenu}>
        <div
          className={`${styles.navItem} ${
            route === "/settings" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faGear} style={{ color: "#adadad" }} />
          <Link href="/settings">Settings</Link>
        </div>
        <div
          className={`${styles.navItem} ${
            route === "/settings" ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "#adadad" }}
          />
          <Link href="/settings">Log out</Link>

          {/* <button>Log Out</button> */}
        </div>
      </div>
    </div>
  );
}
