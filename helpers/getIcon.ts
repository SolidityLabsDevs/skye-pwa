import { ICONS } from 'components/lib';
import type { TDashboardLink } from 'components/lib/dashboard/DashboardLink';

export const getIcon = (i: TDashboardLink['icon']) => {
  if (typeof i === 'string') {
    return ICONS[i as keyof typeof ICONS] || undefined;
  }

  if (!!i && typeof i !== 'string') {
    return i;
  }

  return undefined;
};
