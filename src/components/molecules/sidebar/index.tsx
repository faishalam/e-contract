'use client';
import CLink from '@/components/atoms/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PieChartIcon from '@mui/icons-material/PieChart';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const sidebarClass = useMemo(() => {
    if (pathname.includes('/messages')) return 'hidden';
    return 'w-[260px] sticky top-[var(--header-height)] h-full bg-white border-r';
  }, [pathname]);

  return (
    <>
      <div className={sidebarClass}>
        <div className="h-[55px] justify-start p-3 items-center flex gap-2 border-b mb-4">
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
