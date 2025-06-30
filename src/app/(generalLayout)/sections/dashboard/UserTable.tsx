"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings2, Check, X, Loader } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import {
  useChangeUseStatusMutation,
  useGetUsersQuery,
} from "@/redux/api/userApi";
import AError from "@/components/AError";
import UserTableSkeleton from "@/skeletons/UserItemSkeleton";
import { defaultImg } from "@/data/global.data";
import handleMutation from "@/utils/handleMutation";
import ATooltip from "@/components/ui/ATooltip";

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
  const params = { page: currentPage, limit: limit };
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery(params);
  const users = data?.data || [];

  const meta = data?.meta;

  // Filter users based on debounced search text
  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  // Calculate paginated registrations based on limit
  const totalItems = 4;
  const startIndex = (currentPage - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  // State to track loading status for each user
  const [userLoadingStates, setUserLoadingStates] = useState<{
    [key: string | number]: boolean;
  }>({});

  // Handle change user status
  const [updateStatus, { isLoading: isStatusUpdating }] =
    useChangeUseStatusMutation();

  const handleChangeUserStatus = async (
    id: string | number,
    status: "active" | "blocked"
  ) => {
    // Set loading state for the specific user
    setUserLoadingStates((prev) => ({ ...prev, [id]: true }));
    const data = {
      userId: id,
      status: status === "active" ? "blocked" : "active",
    };

    await handleMutation(data, updateStatus, "Updating user status...");
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
        {/* Data Rows */}
        {isLoading ? (
          <UserTableSkeleton limit={limit} />
        ) : isError ? (
          <AError
            message={(error as any)?.data?.message}
            onRetry={refetch}
            className="py-60 !bg-card"
          />
        ) : (
          <>
            {/* Header Row */}
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-2 font-semibold">User ID</div>
                <div className="col-span-3 font-semibold">Name</div>
                <div className="col-span-3 font-semibold">Email</div>
                <div className="col-span-2 font-semibold">
                  Registration Date
                </div>
                <div className="col-span-2 font-semibold text-right">
                  Action
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((registration: any) => (
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
                        <div
                          className="bg-cover bg-center bg-no-repeat w-8 h-8 rounded-full"
                          style={{
                            backgroundImage: `url(${
                              registration.photoUrl || defaultImg
                            })`,
                          }}
                        ></div>
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
                          {new Date(registration.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      {/* Action Column */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        {registration.status === "blocked" && (
                          <ATooltip text="Unblock User">
                            <Button
                              disabled={
                                (userLoadingStates[registration._id] &&
                                  isStatusUpdating) ||
                                false
                              }
                              onClick={() =>
                                handleChangeUserStatus(
                                  registration._id,
                                  registration.status
                                )
                              }
                              size="icon"
                              className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              {userLoadingStates[registration._id] &&
                              isStatusUpdating ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                          </ATooltip>
                        )}
                        {registration.status === "active" && (
                          <ATooltip text="Block User">
                            <AAlertDialog
                              onAction={() =>
                                handleChangeUserStatus(
                                  registration._id,
                                  registration.status
                                )
                              }
                            >
                              <Button
                                disabled={
                                  (userLoadingStates[registration._id] &&
                                    isStatusUpdating) ||
                                  false
                                }
                                size="icon"
                                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              >
                                {userLoadingStates[registration._id] &&
                                isStatusUpdating ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4" />
                                )}
                              </Button>
                            </AAlertDialog>
                          </ATooltip>
                        )}
                        {/* <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full border-border hover:bg-card"
                        >
                          <Eye className="h-4 w-4" />
                        </Button> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-44 text-center text-primary-foreground">
                  No registrations found.
                </div>
              )}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default UserTable;
