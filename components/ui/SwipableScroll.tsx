'use client';
import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

type RenderProp = (props: { className: string; width: number; currentSlide: number }) => ReactNode;

type Props = {
  children: RenderProp;
  dataLength: number;
  activeIndicatorClassName?: string;
  nonActiveIndicatorClassName?: string;
  indicatorClassName?: string;
  showProgressBar?: boolean;
  autoplay?: boolean;
  autoPlayInterval?: number;
  indicatorPosition?: 'top' | 'bottom';
};

const dragThreshold = 5;

export const SwipableScroll: FC<Props> = memo(
  ({
    activeIndicatorClassName,
    nonActiveIndicatorClassName,
    indicatorClassName,
    children,
    dataLength = 0,
    indicatorPosition = 'bottom',
    showProgressBar = true,
    autoplay = false,
    autoPlayInterval = 3000,
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoSlideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const dragDelta = useRef(0);

    const [blockClick, setBlockClick] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const getContainerWidth = () => scrollRef.current?.offsetWidth || 0;

    const handleMouseDown = (e: React.MouseEvent) => {
      const container = scrollRef.current;
      if (!container) return;

      isDragging.current = true;
      dragDelta.current = 0;
      setBlockClick(false);

      startX.current = e.clientX;
      scrollLeft.current = container.scrollLeft;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const container = scrollRef.current;
      if (!container || !isDragging.current) return;

      const dx = e.clientX - startX.current;
      dragDelta.current = dx;
      container.scrollLeft = scrollLeft.current - dx;

      if (Math.abs(dx) > dragThreshold) {
        setBlockClick(true);
      }
    };

    const handleMouseUp = () => {
      const container = scrollRef.current;
      if (!container) return;

      isDragging.current = false;

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (Math.abs(dragDelta.current) > dragThreshold) {
        const containerWidth = getContainerWidth();
        const moved = container.scrollLeft - scrollLeft.current;
        const threshold = containerWidth * 0.1;

        let newIndex = currentSlide;
        if (moved > threshold) {
          newIndex = Math.min(currentSlide + 1, dataLength - 1);
        } else if (moved < -threshold) {
          newIndex = Math.max(currentSlide - 1, 0);
        }

        setCurrentSlide(newIndex);
        container.scrollTo({ left: newIndex * containerWidth, behavior: 'smooth' });
      }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      const container = scrollRef.current;
      if (!container) return;

      isDragging.current = true;
      dragDelta.current = 0;
      setBlockClick(false);

      startX.current = e.touches[0].clientX;
      scrollLeft.current = container.scrollLeft;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      const container = scrollRef.current;
      if (!container || !isDragging.current) return;

      const dx = e.touches[0].clientX - startX.current;
      dragDelta.current = dx;
      container.scrollLeft = scrollLeft.current - dx;

      if (Math.abs(dx) > dragThreshold) {
        setBlockClick(true);
      }
    };

    const handleTouchEnd = () => {
      const container = scrollRef.current;
      if (!container) return;

      isDragging.current = false;

      if (Math.abs(dragDelta.current) > dragThreshold) {
        const containerWidth = getContainerWidth();
        const moved = container.scrollLeft - scrollLeft.current;
        const threshold = containerWidth * 0.1;

        let newIndex = currentSlide;
        if (moved > threshold) {
          newIndex = Math.min(currentSlide + 1, dataLength - 1);
        } else if (moved < -threshold) {
          newIndex = Math.max(currentSlide - 1, 0);
        }

        setCurrentSlide(newIndex);
        container.scrollTo({ left: newIndex * containerWidth, behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      const container = scrollRef.current;
      const containerWidth = getContainerWidth();
      if (container) {
        const index = Math.round(container.scrollLeft / containerWidth);
        setCurrentSlide(index);
      }
    };

    const handleClickCapture = (e: React.MouseEvent) => {
      if (blockClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const getVisibleIndicators = () => {
      const maxVisible = 5;
      if (dataLength <= maxVisible) return Array.from({ length: dataLength }, (_, i) => i);

      const half = Math.floor(maxVisible / 2);
      let start = Math.max(0, currentSlide - half);
      const end = Math.min(dataLength, start + maxVisible);
      if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

      return Array.from({ length: end - start }, (_, i) => i + start);
    };

    const Indicators = () => (
      <>
        {dataLength < 10 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: dataLength }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  {
                    'w-6 bg-[#d9d9d9]': i === currentSlide,
                    'w-3 bg-[#555555]': i !== currentSlide,
                    [activeIndicatorClassName || '']: i === currentSlide,
                    [nonActiveIndicatorClassName || '']: i !== currentSlide,
                  },
                  indicatorClassName
                )}
              />
            ))}
          </div>
        )}

        {dataLength >= 10 && (
          <div className="flex justify-center gap-2 mt-4">
            {getVisibleIndicators().map(i => (
              <div
                key={i}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  {
                    'w-6 bg-[#5062ff]': i === currentSlide,
                    'w-3 bg-[#c0c6db]': i !== currentSlide,
                    [activeIndicatorClassName || '']: i === currentSlide,
                    [nonActiveIndicatorClassName || '']: i !== currentSlide,
                  },
                  indicatorClassName
                )}
              />
            ))}
          </div>
        )}
      </>
    );

    const scrollToSlide = (index: number) => {
      const container = scrollRef.current;
      const containerWidth = getContainerWidth();
      if (container) {
        container.scrollTo({ left: index * containerWidth, behavior: 'smooth' });
      }
    };

    const nextSlide = () => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % dataLength;
        scrollToSlide(next);
        return next;
      });
    };

    // 🔁 Auto-slide logic
    useEffect(() => {
      if (!autoplay) return;
      if (autoPlayInterval > 0 && dataLength > 1) {
        autoSlideTimerRef.current = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(autoSlideTimerRef.current!);
      }
    }, [autoPlayInterval, dataLength, autoplay]);

    return (
      <div className="w-full overflow-hidden select-none">
        {showProgressBar && (
          <div className="w-full h-0.5 overflow-hidden bg-[#c0c6db] rounded-full">
            <div
              className="h-full transition-all duration-300 bg-[#5062ff]"
              style={{ width: `${((currentSlide + 1) / dataLength) * 100}%` }}
            />
          </div>
        )}
        {indicatorPosition === 'top' && <Indicators />}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
          onClickCapture={handleClickCapture}
        >
          {children?.({
            width: getContainerWidth(),
            className: 'flex-shrink-0 snap-center',
            currentSlide,
          })}
        </div>
        {indicatorPosition === 'bottom' && <Indicators />}
      </div>
    );
  }
);
