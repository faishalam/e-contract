"use client";
import CLink from "@/components/atom/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const sidebarClass = useMemo(() => {
    if (pathname.includes("/messages")) return "hidden";
    return "w-[260px] sticky top-[var(--header-height)] h-full bg-white shadow shadow-[0px_6px_20px_0px_rgba(0,0,0,0.05)]";
  }, [pathname]);

  return (
    <>
      <div className={sidebarClass}>
        <MenuItems
          Icon={DashboardIcon}
          title="Dashboard"
          selected={pathname.startsWith("/dashboard")}
          href="/dashboard"
        />
        <MenuItems
          Icon={PeopleIcon}
          title="User Management"
          selected={pathname.startsWith("/user-management")}
          href="/user-management"
        />
        <MenuItems
          Icon={DescriptionIcon}
          title="E-Contract"
          selected={pathname.startsWith("/e-contract")}
          href="/e-contract"
        />
        <MenuItems
          Icon={HelpOutlineIcon}
          title="Helpdesk"
          selected={pathname.startsWith("/helpdesk")}
          href="/helpdesk"
        />
      </div>
    </>
  );
};
export default Sidebar;

type TMenuItemProps = {
  selected: boolean;
  title: string;
  Icon: React.ElementType;
  href?: string;
};

const MenuItems: React.FC<TMenuItemProps> = ({
  selected,
  title,
  Icon,
  href,
}) => {
  return (
    <CLink href={href ?? ""} prefetch>
      <div
        className={`flex hover:bg-[#CCE1E0] p-3 gap-2 items-center cursor-pointer ${
          selected ? "bg-[#CCE1E0]" : ""
        }`}
      >
        <Icon color={selected ? "primary" : "inherit"} />
        <small className="font-bold text-[#006766]">{title}</small>
      </div>
    </CLink>
  );
};
