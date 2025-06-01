import AContainer from "@/components/AContainer";
import LeaderboardTable from "./LeaderboardTable";

const Leaderboard = () => {
  return (
    <main>
      <AContainer>
        <LeaderboardTable pagination />
      </AContainer>
    </main>
  );
};

export default Leaderboard;
