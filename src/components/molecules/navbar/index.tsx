"use client";
import Image from "next/image";
import { TProps } from "./types";
import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";
import LogoutAccountIcon from "@mui/icons-material/Logout";
import UserAccountIcon from "@mui/icons-material/AccountCircle";
import NotificationIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/QuestionAnswer";
import DropdownButton from "@/components/atom/dropdown-button";
import CLink from "@/components/atom/link";
import CIconButton from "@/components/atom/icon-button";
import { Loader } from "@/components/atom/loader";

const Navbar: React.FC<TProps> = ({ showRightMenu = true }) => {
  const router = useRouter();

  const onLogout = () => {
    router.push("/login");
  };

  return (
    <div
      id="navbar-ckb"
      className="flex items-center sticky h-[var(--header-height)] top-0 justify-between px-4 py-2 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.05)] w-screen m-0 p-0 z-50 bg-white"
    >
      <div
        onClick={() => router.push("/")}
        className="h-[50px] items-center flex cursor-pointer"
      >
        {false ? (
          <Loader />
        ) : (
          <Image
            src={"/asset/dark-logo.webp"}
            alt="Sample Image"
            width={50}
            height={50}
          />
        )}
      </div>
      {showRightMenu && (
        <div className="flex gap-4 items-center">
          <CLink href="/messages" prefetch>
            <CIconButton>
              <Badge color="error" badgeContent={"10"}>
                <ChatIcon />
              </Badge>
            </CIconButton>
          </CLink>
          <CIconButton>
            <Badge color="error" badgeContent={"99+"}>
              <NotificationIcon />
            </Badge>
          </CIconButton>
          <div className="pl-2 border-l border-l-[#E5E7EB]">
            <DropdownButton
              className="text-black"
              menuItems={[
                <div
                  key={Math.random()}
                  onClick={() => router.push("/profile")}
                  className="flex items-center w-[200px]"
                >
                  <UserAccountIcon />
                  <span className="ml-2">Account Setting</span>
                </div>,
                <div
                  key={Math.random()}
                  onClick={onLogout}
                  className="flex items-center w-[200px]"
                >
                  <LogoutAccountIcon />
                  <span className="ml-2">Logout</span>
                </div>,
              ]}
            >
              <Image
                src={
                  "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                }
                alt="Sample Image"
                width={30}
                height={30}
                className="rounded-full w-[30px] h-[30px]"
                unoptimized
              />
              <div className="grid text-xs justify-items-start text-[#4B5563]">
                <div className="font-bold">Faishal</div>
                <small className="text-[60%]">Admin</small>
              </div>
            </DropdownButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
