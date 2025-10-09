'use client';
import CLink from '@/components/atoms/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PieChartIcon from '@mui/icons-material/PieChart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import useLogoutUser from '@/services/auth/logout';
import { toast } from 'sonner';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const isHidden = useMemo(() => {
    return pathname.includes('/messages');
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = (refreshToken: string) => {
    mutate(refreshToken);
  };

  if (isHidden) return null;

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          <div className="flex gap-4 justify-center items-center w-6 h-6 border bg-[#2784c7] rounded-md">
            <DescriptionIcon sx={{ color: 'white', fontSize: '0.8rem' }} />
          </div>
          <p className="text-[#2784c7] font-bold">eContract</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 h-screen bg-white border-r flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 w-[280px] sm:w-[300px] lg:w-[240px] xl:w-[260px]
        `}
      >
        {/* Header */}
        <div className="h-[55px] justify-between p-3 items-center flex gap-2 border-b sticky top-0 bg-white z-10">
          <div className="flex gap-2 items-center">
            <div className="flex gap-4 justify-center items-center w-6 h-6 border bg-[#2784c7] rounded-md">
              <DescriptionIcon sx={{ color: 'white', fontSize: '0.8rem' }} />
            </div>
            <p className="text-[#2784c7] font-bold">eContract</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="py-2">
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
        </div>

        {/* Fixed Logout Button */}
        <button
          className="border-t w-full p-3 cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-black border-gray-200 shrink-0 transition-colors"
          onClick={() => handleLogout(refreshToken ?? '')}
        >
          <LogoutIcon />
          <small className="font-medium">Logout</small>
        </button>
      </div>

      {/* Spacer for mobile to prevent content from going under fixed header */}
      <div className="lg:hidden h-14" />
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
        className={`
          flex hover:bg-[#fef7ed] p-3 mx-2 rounded-lg gap-3 items-center cursor-pointer transition-all duration-200
          ${selected ? 'bg-[#fef7ed] shadow-sm' : ''}
        `}
      >
        <Icon sx={{ color: selected ? '#f46e31' : 'black', fontSize: '1.25rem' }} />
        <small className={`font-medium ${selected ? 'text-[#f46e31]' : 'text-black'}`}>
          {title}
        </small>
      </div>
    </CLink>
  );
};
