import { FC, memo } from 'react';
type NoiseBgProps = {
  className?: string;
};

export const NoiseBg: FC<NoiseBgProps> = memo(({ className }) => {
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.2,
        backgroundImage: 'url("/images/assets/noise.png")',
        pointerEvents: 'none',
      }}
    />
  );
});
