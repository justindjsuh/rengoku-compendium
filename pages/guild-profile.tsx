import SideMenu from "@/comps/SideMenu";
import Image from "next/image";
import styles from "@/styles/GuildProfile.module.css";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import Link from "next/link";

type Members = Database["public"]["Tables"]["users"]["Row"];

export default function GuildProfile() {
  const [memberList, setMemberList] = useState<Members[] | []>([]);

  const getMembers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("approved", "true");
    if (data) {
      setMemberList(data);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.membersContainer}>
        <div className={styles.dashHeader}>
          <h1>Guild Profile</h1>
          <Image
            src="/default_avatar.jpg"
            alt="pink bean avatar"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.membersDetails}>
          <div className={styles.guildInfo}>
            <Image
              src="/logo.png"
              alt="rengoku fire logo"
              width={122}
              height={159}
            />
            <p className={styles.guildName}>Rengoku</p>
            <div className={styles.guildDetails}>
              <p>Honor EXP</p>
              <p>135135153</p>
            </div>
            <div className={styles.guildDetails}>
              <p>Guild Points</p>
              <p>583,037</p>
            </div>
            <div className={styles.guildDetails}>
              <p>Max Members</p>
              <p>65 / 100</p>
            </div>
            <div className={styles.guildDetails}>
              <p>Leader</p>
              <p>Pantimos</p>
            </div>
            <hr />
            <p className={styles.announcementHeader}>Announcements</p>
            <div className={styles.announcements}>
              <p>
                Pantimos will one day lead us to victory against all the bosses.
                And he will give us all the drops.
              </p>
            </div>
          </div>
          <div className={styles.guildMembers}>
            {memberList.map((member) => (
              <div key={member.id} className={styles.member}>
                <Image src="/logo.png" alt="fire logo" width={34} height={45} />
                <p>{member.username}</p>
                {/* <Link href={`/user/${member.username}`}>View Profile</Link> */}
                <Link
                  href={`https://maplestory.gg/c/gms/${member.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
