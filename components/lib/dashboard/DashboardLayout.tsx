'use client';
import cn from 'classnames';
import { FC, PropsWithChildren, memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { customScrollbar } from 'constants/classNames';
import { Container } from 'components/ui/Container';
import { Drawer } from 'components/ui/Drawer';
import { appConfig } from 'config/appConfig';
import { DashboardLink, TDashboardLink } from './DashboardLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { AccountDropdown } from '../account/AccountDropdown';
import { MobileTabbar } from 'components/lib/MobileTabbar';
import { getIcon } from 'helpers';

import { IoMenu, IoCodeWorkingOutline, IoHomeSharp } from 'react-icons/io5';
import { IoMdSettings, IoIosHelpBuoy } from 'react-icons/io';
import { MdModeEdit, MdAdminPanelSettings, MdAudiotrack } from 'react-icons/md';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiLogoutBoxLine, RiNftLine } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { GiAutoRepair } from 'react-icons/gi';
import { SiDotenv } from 'react-icons/si';
import { usePathname } from 'next/navigation';
import { FaNewspaper } from 'react-icons/fa';
import { RxDashboard, RxHamburgerMenu } from 'react-icons/rx';
import {
  FaMoneyBills,
  FaArrowsTurnToDots,
  FaBoltLightning,
  FaGitAlt,
  FaHardDrive,
} from 'react-icons/fa6';
import { FaRegFolder, FaTasks } from 'react-icons/fa';
import { BsFiletypeSass } from 'react-icons/bs';
import { GoPasskeyFill } from 'react-icons/go';
import { TbPigMoney } from 'react-icons/tb';
import { IoLibraryOutline } from 'react-icons/io5';
import { HiLanguage } from 'react-icons/hi2';
import { IoIosNotifications } from 'react-icons/io';
import { PiFileTxt } from 'react-icons/pi';
import { TfiLayoutListPost } from 'react-icons/tfi';

type DashboardLayoutProps = {
  links: TDashboardLink[];
  title?: string;
  containerClassName?: string;
  initialLink?: string;
  floatingSidebar?: boolean;
  withAccount?: boolean;
};

export const ICONS = {
  MdAudiotrack: MdAudiotrack,
  TfiLayoutListPost: TfiLayoutListPost,
  IoLibraryOutline: IoLibraryOutline,
  FaTasks: FaTasks,
  TbPigMoney: TbPigMoney,
  IoIosArrowDown: IoIosArrowDown,
  GoPasskeyFill: GoPasskeyFill,
  IoHomeSharp: IoHomeSharp,
  IoMdSettings: IoMdSettings,
  MdModeEdit: MdModeEdit,
  LiaFileContractSolid: LiaFileContractSolid,
  IoIosArrowForward: IoIosArrowForward,
  RiLogoutBoxLine: RiLogoutBoxLine,
  IoIosHelpBuoy: IoIosHelpBuoy,
  GiAutoRepair: GiAutoRepair,
  SiDotenv: SiDotenv,
  FaNewspaper: FaNewspaper,
  FaMoneyBills: FaMoneyBills,
  RiNftLine: RiNftLine,
  IoCodeWorkingOutline: IoCodeWorkingOutline,
  FaArrowsTurnToDots: FaArrowsTurnToDots,
  FaBoltLightning: FaBoltLightning,
  FaRegFolder: FaRegFolder,
  RxDashboard: RxDashboard,
  BsFiletypeSass: BsFiletypeSass,
  FaGitAlt: FaGitAlt,
  FaHardDrive: FaHardDrive,
  HiLanguage: HiLanguage,
  IoIosNotifications: IoIosNotifications,
  MdAdminPanelSettings: MdAdminPanelSettings,
  PiFileTxt: PiFileTxt,
} as const;

export const DashboardLayout: FC<PropsWithChildren<DashboardLayoutProps>> = memo(
  ({ links, withAccount, children, title, containerClassName, floatingSidebar }) => {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [compact, setCompact] = useState(false);

    useEffect(() => {
      setOpen(false);
    }, [pathname]);

    useEffect(() => {
      setCompact(false);
    }, [open]);

    const sidebar = () => {
      return (
        <div
          className={cn(
            'bg-neutralBg transition-all overflow-y-auto overflow-x-hidden relative gap-4 flex flex-col justify-start items-start w-full  border-r-[1px] border-default py-4 px-2 lg:px-4',
            {
              '!w-64': !compact && !open,
              '!w-24': compact && !open,
              'h-full w-full max-w-full border-none': open,
              'h-screen': !open,
              'sticky top-[1.75rem] shrink-0 rounded-[1.5rem] overflow-y-auto border max-h-max min-h-[34rem]':
                floatingSidebar,
            },
            customScrollbar
          )}
          style={{
            ...(floatingSidebar ? { height: 'max-content' } : {}),
          }}
        >
          <div
            className={cn('flex flex-row items-center w-full gap-4', {
              'justify-center': compact,
            })}
          >
            <button
              onClick={() => setCompact(prev => !prev)}
              className={cn({
                hidden: open,
              })}
            >
              <RxHamburgerMenu size={24} className="text-defaultText" />
            </button>
            <Link
              href="/"
              className={cn('flex flex-col shrink-0', {
                hidden: compact,
              })}
            >
              <Image
                alt="logo"
                sizes="100vw"
                width={0}
                height={0}
                src={appConfig.LOGO}
                className={cn('shrink-0 w-[75px] h-[75px]')}
              />
              <div
                className={cn('hidden lg:block font-bold text-defaultText', {
                  block: open,
                })}
              >
                {title || appConfig.APP_NAME}
              </div>
            </Link>
          </div>

          <hr className="w-full h-px border-0 shrink-0 bg-default" />
          <div className="flex-col w-full flex gap-[4px]">
            {links.map((link, idx) => (
              <DashboardLink
                compact={compact}
                key={`${link?.label}-${link?.href}-${idx}`}
                link={link}
              />
            ))}
          </div>
        </div>
      );
    };

    const tabbarLinks = useMemo(() => {
      return [...links].map(l => ({
        ...l,
        icon: getIcon(l?.icon)?.({ size: 24 }),
      }));
    }, [links]);

    return (
      <>
        <Container
          className={cn('flex flex-col p-0 md:flex-row', containerClassName)}
          extra
          extraClassName={cn({ 'bg-onNeutralBg': !floatingSidebar })}
        >
          <aside
            className={cn('relative z-0 hidden md:block', {
              'ml-4': floatingSidebar,
            })}
          >
            {sidebar()}
          </aside>
          <main
            className={cn(
              'flex relative flex-col z-[-1] w-full bg-neutralBg p-5 lg:p-8 h-screen pb-28 md:pb-0 overflow-y-auto',
              customScrollbar
            )}
          >
            <div className="z-10 flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b-[1px] border-default">
              <Breadcrumbs />
              {withAccount && <AccountDropdown />}
            </div>
            {children}
          </main>
        </Container>
        <div className={cn('md:hidden')}>
          <MobileTabbar
            variant="fixed"
            lastLinkFixed
            routes={
              [
                ...tabbarLinks.filter(l => !l.disabled),
                // ...tabbarLinks.slice(0, 3),
                {
                  icon: <IoMenu size={24} />,
                  label: 'Menu',
                  onClick: () => setOpen(true),
                },
              ] as any
            }
          />
        </div>
        <Drawer title="Menu" rounded={false} visible={open} dismiss={() => setOpen(false)}>
          <>{sidebar()}</>
        </Drawer>
      </>
    );
  }
);
