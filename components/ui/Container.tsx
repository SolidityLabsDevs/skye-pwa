// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { memo, PropsWithChildren, CSSProperties, FC, JSX } from 'react';
import cn from 'classnames';

type ContainerProps = {
  extraWrpClassName?: string;
  extraClassName?: string;
  extraStyles?: CSSProperties;
  className?: string;
  extra?: boolean;
  px?: boolean;
  py?: boolean;
  my?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export const Container: FC<PropsWithChildren<ContainerProps>> = memo(
  ({
    extraWrpClassName,
    extraClassName,
    className,
    children,
    extra,
    px,
    py,
    my,
    as = 'div',
    extraStyles,
  }) => {
    const ContentTag = extra ? 'section' : as;
    const WrapperTag = extra ? as : 'div';

    const content = () => (
      <ContentTag
        className={cn(
          'w-full max-w-[1440px] mx-auto',
          {
            'px-5': px,
            'py-5': py,
            'my-5': my,
          },
          className
        )}
      >
        {children}
      </ContentTag>
    );

    if (extra) {
      return (
        <WrapperTag className={cn('relative w-full', extraWrpClassName)}>
          <div
            style={{
              width: '100vw',
              position: 'relative',
              left: 'calc(-50vw + 50%)',
              ...extraStyles,
            }}
            className={extraClassName}
          >
            {content()}
          </div>
        </WrapperTag>
      );
    }

    return <>{content()}</>;
  }
);
