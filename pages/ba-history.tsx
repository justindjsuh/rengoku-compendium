import { BAModal } from "@/comps/BAModal";
import { BASingle } from "@/comps/BASingle";
import SideMenu from "@/comps/SideMenu";
import styles from "@/styles/BAHistory.module.css";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { Database } from "../types/supabase";

type BA = Database["public"]["Tables"]["ba_history"]["Row"][];
type User_List = Database["public"]["Tables"]["users"]["Row"][];
type User = Database["public"]["Tables"]["users"]["Row"];

interface Single_User {
  username: string;
  player_job: string;
  id: number;
}

export default function BAHistory() {
  const [profile, setProfile] = useState<{
    username: string;
    isAdmin: boolean;
  } | null>({
    username: "",
    isAdmin: false,
  });
  const [userList, setUserList] = useState<User_List | []>([]);
  const [BAInfo, setBAInfo] = useState<BA | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Single_User>({
    username: "",
    player_job: "",
    id: 0,
  });
  const [currentUsername, setCurrentUsername] = useState<string>("");

  const user = useUser();

  const getProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from("users")
      .select("username, isAdmin")
      .eq("auth_id", user?.id)
      .single();
    setProfile(data);
  }, [user?.id]);

  console.log(profile);

  const handleUsernameClick = async (BAinfo: User) => {
    if (BAinfo) {
      const { data, error } = await supabase
        .from("ba_history")
        .select("*")
        .eq("player_name", BAinfo.username)
        .order("date", { ascending: false });
      if (data) {
        if (BAinfo.username && BAinfo.player_job) {
          const player = {
            username: BAinfo.username,
            player_job: BAinfo.player_job,
            id: BAinfo.id,
          };
          setCurrentPlayer(player);
        }
        setBAInfo(data);
        setCurrentUsername(BAinfo.username);
      }
    }
  };

  const getData = useCallback(async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (data) {
      if (data.length > 0) {
        setUserList(data);
      }
    }
  }, []);

  const handleAddBA = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getData();
    getProfile();
  }, [getData, getProfile]);

  return (
    <div className={styles.container}>
      <SideMenu />
      {showModal ? (
        <BAModal
          currentPlayer={currentPlayer}
          setShowModal={setShowModal}
          getData={getData}
          setBAInfo={setBAInfo}
          BAInfo={BAInfo}
        />
      ) : null}
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
          <div className={styles.BAList}>
            <button
              className={
                currentUsername === ""
                  ? `${styles.newBtn} ${styles.disabled}`
                  : profile?.username !== currentUsername && !profile?.isAdmin
                  ? `${styles.newBtn} ${styles.disabled}`
                  : `${styles.newBtn}`
              }
              onClick={handleAddBA}
              disabled={
                currentUsername === ""
                  ? true
                  : profile?.username !== currentUsername && !profile?.isAdmin
              }
              title={
                currentUsername === ""
                  ? "Select a user"
                  : profile?.username !== currentUsername && !profile?.isAdmin
                  ? "You cannot edit another user's BA"
                  : "Add a new BA entry"
              }
            >
              New +
            </button>
            {/* map over dates */}
            {userList.map((user, idx) => {
              return (
                <button
                  className={
                    currentUsername === user.username ? `${styles.active}` : ""
                  }
                  key={idx}
                  onClick={() => handleUsernameClick(user)}
                >
                  {user.username}
                </button>
              );
            })}
          </div>
          <div className={styles.details}>
            {BAInfo.length > 0 ? (
              <BASingle currentPlayer={currentPlayer} BAInfo={[...BAInfo]} />
            ) : currentUsername ? (
              <p>This user currently has no BA history</p>
            ) : (
              <p>Select a user to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
