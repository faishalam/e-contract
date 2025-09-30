'use client';
import Image from 'next/image';
import { TProps } from './types';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/Notifications';
import CInput from '@/components/atoms/input';
import useAuth from '@/context/hooks';

const Navbar: React.FC<TProps> = ({ showRightMenu = true }) => {
  const { dataProfile } = useAuth();

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
            <div className="flex items-center gap-2">
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
              <div className="flex flex-col justify-center items-start w-full">
                <p className="text-sm font-medium">{dataProfile?.name ?? 'Testing'}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
