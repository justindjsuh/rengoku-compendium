import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/LootModal.module.css";
import { Database } from "@/types/supabase";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

type Boss = Database["public"]["Tables"]["bosses"]["Row"];

type Members = Database["public"]["Tables"]["users"]["Row"][];

interface Item_Entry {
  itemName: string;
  owner: string;
}

interface Modal_Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  currentBossDetails: Boss;
  currentDifficulty: string;
}

export const LootModal: React.FC<Modal_Props> = ({
  setShowModal,
  currentBossDetails,
  currentDifficulty,
}) => {
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");
  const [sweeper, setSweeper] = useState<string>("");
  const [item1, setItem1] = useState<Item_Entry | {}>({});
  const [item2, setItem2] = useState<Item_Entry | {}>({});
  const [item3, setItem3] = useState<Item_Entry | {}>({});
  const [guildMembers, setGuildMembers] = useState<Members | []>([]);

  //   when i get back
  // working on boss clear entry form
  //   Sweeper and Owner should both be dropdowns with a list of guild members
  // slight issue to work out is how to handle dynamic # of inputs for drops (i.e. could get 0 or 2 drops)
  // Have to make two separate supabase inserts, one for clear history, and one for loot history
  // I think that's about it

  const getGuildMembers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("approved", true);
    if (data) {
      setGuildMembers(data);
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    getGuildMembers();
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.playerInfo}>
            <p>
              {currentBossDetails.name} <span>({currentDifficulty})</span>
            </p>
            <p>Boss Clear Entry</p>
          </div>
          <FontAwesomeIcon
            onClick={() => setShowModal(false)}
            icon={faXmark}
            size="lg"
            style={{ color: "#e8e8e8" }}
          />{" "}
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.dateInputs}>
              <p>Date Range</p>
              <div className={styles.dateDiv}>
                <input
                  type="date"
                  className={styles.date}
                  onChange={(e) => setDate1(e.target.value)}
                />
                <p>-</p>
                <input
                  className={styles.date}
                  type="date"
                  onChange={(e) => setDate2(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                onChange={(e) => setSweeper(e.target.value)}
                defaultValue="Sweeper"
              >
                <option value="Sweeper" disabled={true} hidden={true}>
                  Sweeper
                </option>
                {guildMembers.map((member, idx) => (
                  <option key={idx} value={member.username}>
                    {member.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Item 1"
                onChange={(e) => setItem1(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Item 2"
                onChange={(e) => setItem2(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Item 3"
                onChange={(e) => setItem3(e.target.value)}
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
