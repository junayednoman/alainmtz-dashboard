import {
  Bell,
  ClipboardList,
  Settings,
  UserRoundCog,
  Users,
} from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navMain: TNavMain = [
  {
    title: "Manage Registrations",
    url: "/dashboard/manage-registrations",
    icon: <ClipboardList />,
  },
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: <UserRoundCog />,
  },
  {
    title: "Leaderboard Section",
    url: "/dashboard/leaderboard",
    icon: <Users />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];
