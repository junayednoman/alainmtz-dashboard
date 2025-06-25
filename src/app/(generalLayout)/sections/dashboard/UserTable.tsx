"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings2, Check, X, Eye } from "lucide-react";
import Image from "next/image";
import panda from "@/assets/panda.png";
import { registrations } from "@/data/registrations.data";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { AAlertDialog } from "@/components/modal/AAlertDialog";

const UserTable = ({
  pagination = false,
  limit = 10,
}: {
  pagination?: boolean;
  limit?: number;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter registrations based on debounced search text
  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.name
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()) ||
      registration.email
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase())
  );

  // Calculate paginated registrations based on limit
  const totalItems = filteredRegistrations.length;
  const startIndex = (currentPage - 1) * limit;
  const paginatedRegistrations = filteredRegistrations.slice(
    startIndex,
    startIndex + limit
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
  }, [debouncedSearchText]);

  const handleBlockUser = (id: string | number) => {
    console.log("Block User:", id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          User Management
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 bg-input border-border"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary text-primary-foreground px-4 py-3">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-2 font-semibold">User ID</div>
            <div className="col-span-3 font-semibold">Name</div>
            <div className="col-span-3 font-semibold">Email</div>
            <div className="col-span-2 font-semibold">Registration Date</div>
            <div className="col-span-2 font-semibold text-right">Action</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {paginatedRegistrations.length > 0 ? (
            paginatedRegistrations.map((registration) => (
              <div
                key={registration.id}
                className="px-4 py-3 hover:bg-card/50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* User ID Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      {registration.id || "N/A"}
                    </span>
                  </div>

                  {/* Name Column */}
                  <div className="col-span-3 flex items-center gap-2">
                    <Image
                      src={panda || "/placeholder.svg"}
                      alt={registration.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium text-primary-foreground truncate">
                      {registration.name}
                    </span>
                  </div>

                  {/* Email Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {registration.email}
                    </span>
                  </div>

                  {/* Date Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      {new Date(
                        registration.registrationDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <AAlertDialog
                      onAction={() => handleBlockUser(registration.id)}
                    >
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </AAlertDialog>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-primary-foreground">
              No registrations found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && totalItems > limit && (
          <div className="p-4 flex">
            <APagination
              totalItems={totalItems}
              itemsPerPage={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
