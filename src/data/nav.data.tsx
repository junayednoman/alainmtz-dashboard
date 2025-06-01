import { Bell, Settings, UserRoundCog, Users } from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navMain: TNavMain = [
  {
    title: "User Management",
    url: "/user-management",
    icon: <UserRoundCog />,
  },
  {
    title: "Leaderboard Section",
    url: "/leaderboard-section",
    icon: <Users />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];
