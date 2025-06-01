import AContainer from "@/components/AContainer";
import TopStats from "../sections/dashboard/TopStats";
import TopPerformers from "../sections/dashboard/TopPerformers";
import Banners from "../sections/dashboard/Banners";
import UserTable from "../sections/dashboard/UserTable";

export default function Home() {
  return (
    <main>
      <AContainer>
        <TopStats />
        <div className="grid grid-cols-3 gap-6 mt-6">
          <section className="col-span-1 min-h-[300px]">
            <TopPerformers />
            <Banners />
          </section>
          <section className="col-span-2 min-h-[300px] bg-card rounded-xl p-5">
            <UserTable limit={8} />
          </section>
        </div>
      </AContainer>
    </main>
  );
}
