'use client';
import Image from 'next/image';
import { TProps } from './types';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import LogoutAccountIcon from '@mui/icons-material/Logout';
import UserAccountIcon from '@mui/icons-material/AccountCircle';
import NotificationIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/QuestionAnswer';
import DropdownButton from '@/components/atoms/dropdown-button';
import CLink from '@/components/atoms/link';
import CIconButton from '@/components/atoms/icon-button';
import { Loader } from '@/components/atoms/loader';
import CInput from '@/components/atoms/input';

const Navbar: React.FC<TProps> = ({ showRightMenu = true }) => {
  const router = useRouter();

  const onLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex items-center sticky h-[55px] top-0 justify-between px-8 py-2 w-full m-0 p-0 z-50 bg-[#f9fafb] text-black">
      {showRightMenu && (
        <div className="w-full flex justify-between items-end">
          <div className="w-full text-sm">
            <p>Selasa, 14 Juli 2025</p>
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
            <Image
              src={
                'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg'
              }
              alt="Sample Image"
              width={30}
              height={30}
              className="rounded-full w-[30px] h-[30px]"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
