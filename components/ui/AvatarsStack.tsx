import { FC, memo } from 'react';
import { Stacked } from './Stacked';
import { Avatar } from './Avatar';

type AvatarsStackProps = {
  srcList?: string[];
};

const defaultSrcList = [
  `https://picsum.photos/100?random=1`,
  `https://picsum.photos/100?random=2`,
  `https://picsum.photos/100?random=3`,
  `https://picsum.photos/100?random=4`,
  `https://picsum.photos/100?random=5`,
];

export const AvatarsStack: FC<AvatarsStackProps> = memo(({ srcList = defaultSrcList }) => {
  return (
    <Stacked>{srcList?.map((src, idx) => <Avatar border key={idx} rounded src={src} />)}</Stacked>
  );
});
