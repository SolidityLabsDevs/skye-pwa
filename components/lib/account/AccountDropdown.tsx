'use client';
import { DropdownButton } from 'components/ui/DropdownButton';
import { ListItem } from 'components/ui/ListItem';
import { ListItemProps } from 'components/ui';
import { useLogout } from 'hooks';
import { FC, memo } from 'react';
import { useUserStore } from 'stores';
import { AvatarStorage } from '../AvatarStorage';

type AccountDropdownProps = {
  dropDownButtonClassName?: string;
};

export const AccountDropdown: FC<AccountDropdownProps> = memo(({ dropDownButtonClassName }) => {
  const { imageId, name, image } = useUserStore(state => state.user);
  const [logout, loading] = useLogout();

  const ITEMS: ListItemProps[] = [
    { value: 'Dashboard', href: '/dashboard' },
    { value: 'Log out', onClick: () => logout() },
  ];

  return (
    <DropdownButton
      className={dropDownButtonClassName}
      customButton={
        <ListItem
          icon={
            <div className="relative">
              <AvatarStorage
                imageSrc={image?.base64 || image?.url || undefined}
                imageId={imageId || ''}
                avatarProps={{ rounded: true }}
              />
            </div>
          }
          withArrow
          withBg="mobile"
          value={name || 'Profile'}
        />
      }
    >
      <div className="flex flex-col gap-1 lg:gap-0">
        {ITEMS.map((item, idx) => (
          <ListItem key={idx} {...item} withBg="mobile" withArrow disabled={loading} />
        ))}
      </div>
    </DropdownButton>
  );
});
