'use client';
import Image from 'next/image';
import LogoutAccountIcon from '@mui/icons-material/Logout';
import UserAccountIcon from '@mui/icons-material/AccountCircle';
import { TProps } from './types';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications';
import CInput from '@/components/atoms/input';
import useAuth from '@/context/profileProvider/hooks';
import DropdownButton from '@/components/atoms/dropdown-button';
import ModalUserProfile from '@/components/molecules/modal-profile';
import useLogoutUser from '@/services/auth/logout';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import ModalChangePassword from '@/components/molecules/modal-change-password';
import { Skeleton } from '@mui/material';
import ModalUpdateProfile from '../modal-update-profile';

const Navbar: React.FC<TProps> = ({ showRightMenu = true }) => {
  const {
    dataProfile,
    openModalProfile,
    setOpenModalProfile,
    openModalChangePassword,
    isLoadingDataProfile,
    openModalUpdateProfile,
  } = useAuth();
  const router = useRouter();
  const refreshToken = Cookies.get('refreshToken') as string;

  const { mutate: mutateLogout } = useLogoutUser({
    onSuccess: () => {
      router.push('/login');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      router.push('/login');
      toast.success('Logout Success');
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const handleLogout = (refreshToken: string) => {
    mutateLogout(refreshToken);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 shrink-0 h-[55px] bg-[#f9fafb]">
      {showRightMenu && (
        <div className="w-full flex justify-between items-center gap-4">
          <div className="text-sm text-gray-700">
            <p>
              {new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Jakarta',
              }).format(new Date())}
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 flex-1">
            <CInput
              className="max-w-md w-full"
              type="text"
              placeholder="Search"
              icon={<SearchIcon className="text-black" />}
            />
            <div className="w-[30px] h-[30px] bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors shrink-0">
              <NotificationIcon className="text-gray-700" style={{ fontSize: '1.3rem' }} />
            </div>
            {isLoadingDataProfile ? (
              <ProfileDropdownSkeleton />
            ) : (
              <div className="pl-4 border-l border-l-gray-200 shrink-0">
                <DropdownButton
                  className="text-black"
                  menuItems={[
                    <div
                      key="profile"
                      onClick={() => {
                        setOpenModalProfile(true);
                      }}
                      className="flex items-center w-[200px] px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <UserAccountIcon />
                      <span className="ml-2">Profile</span>
                    </div>,
                    <div
                      key="logout"
                      onClick={() => handleLogout(refreshToken)}
                      className="flex items-center w-[200px] px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogoutAccountIcon />
                      <span className="ml-2">Logout</span>
                    </div>,
                  ]}
                >
                  <Image
                    src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full w-[30px] h-[30px]"
                    unoptimized
                  />
                  <div className="grid text-sm justify-items-start text-gray-700 ml-2">
                    <div className="font-bold">{dataProfile?.name}</div>
                    <small className="text-gray-500 text-xs">{dataProfile?.role}</small>
                  </div>
                </DropdownButton>
              </div>
            )}
          </div>
        </div>
      )}
      {openModalProfile && <ModalUserProfile />}
      {openModalUpdateProfile && <ModalUpdateProfile />}
      {openModalChangePassword && <ModalChangePassword />}
    </nav>
  );
};

function ProfileDropdownSkeleton() {
  return (
    <div className="pl-4 border-l border-l-gray-200 shrink-0 flex items-center">
      {/* Avatar */}
      <Skeleton variant="circular" width={30} height={30} />

      {/* Name + Role */}
      <div className="grid text-sm justify-items-start ml-2">
        <Skeleton variant="text" width={80} height={18} />
        <Skeleton variant="text" width={50} height={14} />
      </div>
    </div>
  );
}

export default Navbar;
