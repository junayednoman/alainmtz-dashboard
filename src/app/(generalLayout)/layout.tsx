import Providers from "@/provider";
import { ReactNode } from "react";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default GeneralLayout;
