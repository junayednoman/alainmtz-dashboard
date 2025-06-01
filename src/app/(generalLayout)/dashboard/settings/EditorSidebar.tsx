"use client";

import type React from "react";

import {
  FileText,
  Shield,
  ScrollText,
  HelpCircle,
  Users,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SettingType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const settingTypes: SettingType[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: <Shield className="h-4 w-4" />,
    description: "Data collection and usage policies",
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    icon: <ScrollText className="h-4 w-4" />,
    description: "Service terms and user agreements",
  },
  {
    id: "about-us",
    title: "About Us",
    icon: <Users className="h-4 w-4" />,
    description: "Company information and mission",
  },
  {
    id: "help-support",
    title: "Help & Support",
    icon: <HelpCircle className="h-4 w-4" />,
    description: "User guides and support information",
  },
  {
    id: "contact-info",
    title: "Contact Information",
    icon: <Mail className="h-4 w-4" />,
    description: "Contact details and office locations",
  },
  {
    id: "faq",
    title: "FAQ",
    icon: <FileText className="h-4 w-4" />,
    description: "Frequently asked questions",
  },
];

interface EditorSidebarProps {
  activeSettingId: string;
  onSettingSelect: (settingId: string) => void;
}

const EditorSidebar = ({
  activeSettingId,
  onSettingSelect,
}: EditorSidebarProps) => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Content Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your application content
        </p>
      </div>

      {/* Settings List */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {settingTypes.map((setting) => (
            <Button
              key={setting.id}
              variant={activeSettingId === setting.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 ${
                activeSettingId === setting.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-background text-foreground"
              }`}
              onClick={() => onSettingSelect(setting.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-0.5">{setting.icon}</div>
                <div className="text-left">
                  <div className="font-medium">{setting.title}</div>
                  <div
                    className={`text-xs mt-1 ${
                      activeSettingId === setting.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {setting.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
export { settingTypes };
