'use client';
import CLink from '@/components/atoms/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PieChartIcon from '@mui/icons-material/PieChart';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import useLogoutUser from '@/services/auth/logout';
import { toast } from 'sonner';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useLogoutUser({
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
  const refreshToken = Cookies.get('refreshToken');

  const sidebarClass = useMemo(() => {
    if (pathname.includes('/messages')) return 'hidden';
    return 'w-[240px] h-screen bg-white border-r flex flex-col justify-between shrink-0';
  }, [pathname]);

  const handleLogout = (refreshToken: string) => {
    mutate(refreshToken);
  };

  return (
    <div className={sidebarClass}>
      {/* Scrollable Menu Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="h-[55px] justify-start p-3 items-center flex gap-2 border-b mb-4 sticky top-0 bg-white z-10">
          <div className="flex gap-4 justify-center items-center w-6 h-6 border bg-[#2784c7] rounded-md">
            <DescriptionIcon sx={{ color: 'white', fontSize: '0.8rem' }} />
          </div>
          <p className="text-[#2784c7] font-bold">eContract</p>
        </div>

        <MenuItems
          Icon={DashboardIcon}
          title="Dashboard"
          selected={pathname.startsWith('/dashboard')}
          href="/dashboard"
        />
        <MenuItems
          Icon={DescriptionIcon}
          title="Contract Management"
          selected={pathname.startsWith('/contract-management')}
          href="/contract-management"
        />
        <MenuItems
          Icon={DescriptionIcon}
          title="Merchant Management"
          selected={pathname.startsWith('/merchant-management')}
          href="/merchant-management"
        />
        <MenuItems
          Icon={DescriptionIcon}
          title="Partner Management"
          selected={pathname.startsWith('/partner-management')}
          href="/partner-management"
        />
        <MenuItems
          Icon={DescriptionIcon}
          title="e-Sign & e-stamp Quota"
          selected={pathname.startsWith('/e-sign')}
          href="/e-sign"
        />
        <MenuItems
          Icon={GroupIcon}
          title="User Management"
          selected={pathname.startsWith('/user-management')}
          href="/user-management"
        />
        <MenuItems
          Icon={PieChartIcon}
          title="Reports & Analytics"
          selected={pathname.startsWith('/helpdesk')}
          href="/helpdesk"
        />
      </div>

      {/* Fixed Logout Button */}
      <button
        className="border-t w-full p-3 cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-black border-gray-200 shrink-0"
        onClick={() => handleLogout(refreshToken ?? '')}
      >
        <LogoutIcon />
        <small className="font-medium">Logout</small>
      </button>
    </div>
  );
};

export default Sidebar;

type TMenuItemProps = {
  selected: boolean;
  title: string;
  Icon: React.ElementType;
  href?: string;
};

const MenuItems: React.FC<TMenuItemProps> = ({ selected, title, Icon, href }) => {
  return (
    <CLink href={href ?? ''} prefetch>
      <div
        className={`flex hover:bg-[#fef7ed] p-3 gap-2 items-center cursor-pointer ${
          selected ? 'bg-[#fef7ed]' : ''
        }`}
      >
        <Icon sx={{ color: selected ? '#f46e31' : 'black', fontSize: '1rem' }} />

        <small className={`font-medium ${selected ? 'text-[#f46e31]' : 'text-black'}`}>
          {title}
        </small>
      </div>
    </CLink>
  );
};
