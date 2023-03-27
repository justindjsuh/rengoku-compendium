type BA_Single = {
  ba_id: number;
  boss_dmg: string | null;
  created_at: string | null;
  damage: string | null;
  id: number;
  ied: string | null;
  main_stat: string | null;
  player_job: string | null;
  player_name: string;
  range: string | null;
  time: string | null;
};

interface BA_Props {
  BAInfo: BA_Single[];
}

export const BASingle: React.FC<BA_Props> = ({ BAInfo }) => {
  return (
    <h1>
      {BAInfo.map((ba, idx) => (
        <p key={idx}>{ba.damage}</p>
      ))}
    </h1>
  );
};
