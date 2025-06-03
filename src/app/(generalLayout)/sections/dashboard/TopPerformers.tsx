"use client";
import Image from "next/image";
import panda from "@/assets/panda.png";
import one from "@/assets/1.png";
import two from "@/assets/2.png";
import three from "@/assets/3.png";
import { useGetLeaderboardQuery } from "@/redux/api/leaderBoardApi";
import { defaultImg } from "@/data/global.data";
import TopPerformerSkeleton from "@/skeletons/TopPerformerSkeleton";
import AError from "@/components/AError";

const TopPerformers = () => {
  const monthName = new Date()
    .toLocaleString("default", { month: "long" })
    .toLocaleLowerCase()
    .slice(0, 3);

  const params = { month: monthName, limit: 3 };
  const { data, isLoading, isError, error, refetch } =
    useGetLeaderboardQuery(params);

  const leaderboard = data?.data;

  return (
    <div className="rounded-xl p-6 bg-card text-center text-primary-foreground">
      <h5 className="font-bold text-xl">Top Performer of the Month</h5>

      {isLoading ? (
        <TopPerformerSkeleton />
      ) : isError ? (
        <AError
          className="!bg-transparent py-32"
          message={(error as any)?.data?.message}
          onRetry={refetch}
        />
      ) : (
        <div className="mt-6">
          <div className="text-center">
            <div
              className="rounded-full border-3 border-primary mx-auto bg-cover bg-center bg-no-repeat w-[83px] h-[83px]"
              style={{
                backgroundImage: `url(${
                  leaderboard?.[0]?.user?.photoUrl || defaultImg
                })`,
              }}
            />
            <Image
              src={one}
              alt="avatar"
              width={42}
              height={42}
              className="rounded-full mx-auto -mt-5"
            />

            <h5 className="font-semibold mt-4">
              {leaderboard?.[0]?.user?.name}
            </h5>
            <p>
              <span className="font-medium text-foreground">Accounts:</span>{" "}
              {leaderboard?.[0]?.totalAccounts || 0}
            </p>
            <p>
              <span className="font-medium text-foreground">Amount:</span> $
              {leaderboard?.[0]?.totalAmount || 0}
            </p>
          </div>
          <div className="flex items-center gap-5 justify-between mt-6 mx-16">
            <div className="text-center">
              <div
                className="rounded-full border-3 border-primary mx-auto bg-cover bg-center bg-no-repeat w-[70px] h-[70px]"
                style={{
                  backgroundImage: `url(${
                    leaderboard?.[1]?.user?.photoUrl || defaultImg
                  })`,
                }}
              />
              <Image
                src={two}
                alt="avatar"
                width={35}
                height={35}
                className="rounded-full mx-auto -mt-4"
              />
              <h5 className="font-semibold mt-4">
                {leaderboard?.[1]?.user?.name}
              </h5>
              <p>
                <span className="font-medium text-foreground">Accounts:</span>
                {leaderboard?.[1]?.totalAccounts || 0}
              </p>
              <p>
                <span className="font-medium text-foreground">Amount:</span> $
                {leaderboard?.[1]?.totalAmount || 0}
              </p>
            </div>
            <div className="text-center">
              <div
                className="rounded-full border-3 border-primary mx-auto bg-cover bg-center bg-no-repeat w-[70px] h-[70px]"
                style={{
                  backgroundImage: `url(${
                    leaderboard?.[2]?.user?.photoUrl || panda
                  })`,
                }}
              />
              <Image
                src={three}
                alt="avatar"
                width={35}
                height={35}
                className="rounded-full mx-auto -mt-4"
              />
              <h5 className="font-semibold mt-4">
                {leaderboard?.[2]?.user?.name}
              </h5>
              <p>
                <span className="font-medium text-foreground">Accounts:</span>{" "}
                {leaderboard?.[2]?.totalAccounts || 0}
              </p>
              <p>
                <span className="font-medium text-foreground">Amount:</span> $
                {leaderboard?.[2]?.totalAmount || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPerformers;
