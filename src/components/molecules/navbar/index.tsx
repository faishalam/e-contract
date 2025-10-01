'use client';
import Image from 'next/image';
import LogoutAccountIcon from '@mui/icons-material/Logout';
import UserAccountIcon from '@mui/icons-material/AccountCircle';
import { TProps } from './types';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications';
import CInput from '@/components/atoms/input';
import useAuth from '@/context/AuthProvider/hooks';
import DropdownButton from '@/components/atoms/dropdown-button';
import ModalUserProfile from '@/components/organism/modal-profile';
import useLogoutUser from '@/services/auth/logout';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import ModalChangePassword from '@/components/organism/modal-change-password';

const Navbar: React.FC<TProps> = ({ showRightMenu = true }) => {
  const { dataProfile, openModalProfile, setOpenModalProfile, openModalChangePassword } = useAuth();
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
    <div className="flex items-center sticky top-0 justify-between px-8 py-2 m-0 p-0 z-50 bg-[#f9fafb] text-black">
      {showRightMenu && (
        <div className="w-full flex justify-between items-end">
          <div className="w-full text-sm">
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
          <div className="w-full flex justify-end items-center gap-4">
            <CInput
              className="w-1/2"
              type="text"
              placeholder="Search"
              icon={<SearchIcon className="text-black" />}
              // onChange={e => setSearch(e.target.value)}
              // value={search}
            />
            <div className="w-[30px] h-[30px] bg-gray-200 rounded-full flex items-center justify-center">
              <NotificationIcon className="text-gray-700" style={{ fontSize: '1.3rem' }} />
            </div>
            <div className="pl-2 border-l border-l-[#E5E7EB]">
              <DropdownButton
                className="text-black"
                menuItems={[
                  <div
                    key={Math.random()}
                    onClick={() => {
                      setOpenModalProfile(true);
                    }}
                    className="flex items-center w-[200px]"
                  >
                    <UserAccountIcon />
                    <span className="ml-2">Profile</span>
                  </div>,
                  <div
                    key={Math.random()}
                    onClick={() => handleLogout(refreshToken)}
                    className="flex items-center w-[200px]"
                  >
                    <LogoutAccountIcon />
                    <span className="ml-2">Logout</span>
                  </div>,
                ]}
              >
                <Image
                  src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                  alt="Sample Image"
                  width={30}
                  height={30}
                  className="rounded-full w-[30px] h-[30px]"
                  unoptimized
                />
                <div className="grid text-sm justify-items-start text-[#4B5563]">
                  <div className="font-bold">{dataProfile?.name}</div>
                  <small className="text-gray-500 text-xs">{dataProfile?.role}</small>
                </div>
              </DropdownButton>
            </div>
          </div>
        </div>
      )}
      {openModalProfile && <ModalUserProfile />}
      {openModalChangePassword && <ModalChangePassword />}
    </div>
  );
};

export default Navbar;
