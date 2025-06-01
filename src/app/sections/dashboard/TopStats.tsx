"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/data/others.data";
import { useState } from "react";

const TopStats = () => {
  const [salesMonth, setSalesMonth] = useState("january");
  const [earningMonth, setEarningMonth] = useState("january");
  const [userMonth, setUserMonth] = useState("january");

  const handleSalesMonthChange = (value: string) => {
    setSalesMonth(value);
    console.log("Selected month:", value);
  };

  const handleEarningMonthChange = (value: string) => {
    setEarningMonth(value);
    console.log("Selected month:", value);
  };

  const handleUserMonthChange = (value: string) => {
    setUserMonth(value);
    console.log("Selected month:", value);
  };

  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
          <div className="flex justify-between gap-3 mb-10">
            <h5 className="font-bold text-xl">Total Salespersons</h5>
            <Select value={salesMonth} onValueChange={handleSalesMonthChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((month) => (
                    <SelectItem key={month.name} value={month.value}>
                      {month.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <span className="text-4xl font-bold tabular-nums">24</span>
        </div>
        <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
          <div className="flex justify-between gap-3 mb-10">
            <h5 className="font-bold text-xl">Total Earning</h5>
            <Select
              value={earningMonth}
              onValueChange={handleEarningMonthChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((month) => (
                    <SelectItem key={month.name} value={month.value}>
                      {month.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <span className="text-4xl font-bold tabular-nums">$453</span>
        </div>
        <div className="bg-card text-card-foreground p-6 px-8 rounded-xl">
          <div className="flex justify-between gap-3 mb-10">
            <h5 className="font-bold text-xl">Total Users</h5>
            <Select value={userMonth} onValueChange={handleUserMonthChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((month) => (
                    <SelectItem key={month.name} value={month.value}>
                      {month.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <span className="text-4xl font-bold tabular-nums">94</span>
        </div>
      </div>
    </section>
  );
};

export default TopStats;
