import SideMenu from "@/comps/SideMenu";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/SingleUser.module.css";

interface GraphData {
  AvatarURL: string;
  ClassID: number;
  ClassRankGroupID: number;
  CurrentEXP: number;
  DateLabel: string;
  EXPDifference: number;
  EXPToNextLevel: number;
  ImportTime: number;
  Level: number;
  Name: string;
  ServerID: number;
  ServerMergeID: number;
  TotalOverallEXP: number;
}
[];

interface CharDetails {
  AchievementPoints: number;
  AchievementRank: number;
  CharacterImageURL: string;
  Class: string;
  ClassRank: number;
  EXP: number;
  EXPPercent: number;
  GlobalRanking: number;
  GraphData: GraphData;
  Guild: string;
  LegionCoinsPerDay: number;
  LegionLevel: number;
  LegionPower: number;
  LegionRank: number;
  Level: number;
  Name: string;
  Server: string;
  ServerClassRanking: number;
  ServerRank: number;
  ServerSlug: string;
}

interface Data {
  CharacterData: CharDetails;
}

export default function User({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { username } = router.query;
  const charData = data.CharacterData;

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.userContainer}>
        <div className={styles.dashHeader}>
          <h1>{username}&apos;s Profile</h1>
          <Image
            src="/default_avatar.jpg"
            alt="pink bean avatar"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.banner}></div>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <Image
                src={`${charData.CharacterImageURL}`}
                alt={`${charData.Name} character avatar`}
                height={100}
                width={100}
              />
            </div>
            <div className={styles.playerDetails}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  const res = await fetch(
    `https://api.maplestory.gg/v2/public/character/gms/${context.query.username}`
  );
  const data = await res.json();
  return { props: { data } };
};
