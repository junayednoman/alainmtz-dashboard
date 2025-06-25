import AContainer from "@/components/AContainer";
import LeaderboardTable from "./LeaderboardTable";

const Leaderboard = () => {
  return (
    <main>
      <AContainer>
        <LeaderboardTable limit={11} pagination />
      </AContainer>
    </main>
  );
};

export default Leaderboard;
