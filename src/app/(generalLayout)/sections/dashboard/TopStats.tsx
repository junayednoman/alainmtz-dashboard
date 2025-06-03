"use client";
import AError from "@/components/AError";
import { useGetMetaQuery } from "@/redux/api/dashboardApi";
import StatCardSkeleton from "@/skeletons/StatCardSkeleton";

const TopStats = () => {
  const { data, isLoading, isError, error, refetch } = useGetMetaQuery("");
  const meta = data?.data;

  return (
    <section>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : isError ? (
        <AError
          className="!bg-card"
          message={(error as any)?.data?.message}
          onRetry={refetch}
        />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
            <div className="flex justify-between gap-3 mb-10">
              <h5 className="font-bold text-xl">Total Salespersons</h5>
            </div>
            <span className="text-4xl font-bold tabular-nums">
              {meta?.totalSalesPersons || 0}
            </span>
          </div>
          <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
            <div className="flex justify-between gap-3 mb-10">
              <h5 className="font-bold text-xl">New Registers</h5>
            </div>
            <span className="text-4xl font-bold tabular-nums">
              {meta?.newRegisterCount || 0}
            </span>
          </div>
          <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
            <div className="flex justify-between gap-3 mb-10">
              <h5 className="font-bold text-xl">Total Users</h5>
            </div>
            <span className="text-4xl font-bold tabular-nums">
              {meta?.totalUserCount || 0}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopStats;
