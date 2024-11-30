import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export function MovingCards({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [isMoving, setIsMoving] = useState(true);
  const [activeChildIndex, setActiveChildIndex] = useState<number | null>(null);

  // Handle double click on the container to toggle overall movement
  const handleContainerDoubleClick = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up
    e.stopPropagation();
    setIsMoving(!isMoving);
  };

  // Handle double click on individual children
  const handleChildDoubleClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChildIndex(activeChildIndex === index ? null : index);
  };

  // Wrap children with click handlers and active states
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as React.ReactElement<any>, {
      onDoubleClick: (e: React.MouseEvent) => handleChildDoubleClick(index, e),
      className: cn(
        child.props.className,
        "transition-all duration-200",
      ),
      style: {
        ...child.props.style,
        animationPlayState: activeChildIndex === index ? "paused" : "running",
      },
    });
  });

  return (
    <div
      {...props}
      onDoubleClick={handleContainerDoubleClick}
      className={cn(
        "group relative flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical && isMoving,
              "animate-marquee-vertical flex-col": vertical && isMoving,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
              "[animation-play-state:paused]": !isMoving,
            })}
          >
            {wrappedChildren}
          </div>
        ))}
    </div>
  );
}

export default MovingCards;
