import
{
    AnimatePresence,
    motion,
    MotionProps,
    PanInfo
} from 'framer-motion';
import React, { ReactNode, useEffect, useRef } from 'react';
import { StyledItem } from './Styled';

export interface CarouselItemProps
{
    animation: 'fade' | 'slide',
    next?: Function,
    prev?: Function,
    state: {
        active: number,
        prevActive: number,
        next: boolean
    }
    swipe?: boolean,
    index: number,
    maxIndex: number,
    duration: number,
    child: ReactNode,
    setHeight: Function
}

export const CarouselItem = ({ animation, next, prev, swipe, state, index, maxIndex, duration, child, setHeight }: CarouselItemProps) =>
{
    const slide = animation === 'slide';
    const fade = animation === 'fade';

    const dragProps: MotionProps = {
        drag: 'x',
        layout: true,
        onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void =>
        {
            if (!swipe) return;
            console.log(info);
            if (info.offset.x > 0) prev && prev();
            else if (info.offset.x < 0) next && next();

            event.stopPropagation();
        },
        dragElastic: 0,
        dragConstraints: { left: 0, right: 0 }
    }

    const divRef = useRef<any>(null);

    useEffect(() =>
    {
        if (divRef.current)
            setHeight(divRef.current.offsetHeight);
    }, [divRef])

    const variants = {
        leftwardExit: {
            x: slide ? '-100%' : undefined,
            opacity: fade ? 0 : undefined,
            zIndex: 0,
            // position: 'relative'
        },
        leftOut: {
            x: slide ? '-100%' : undefined,
            opacity: fade ? 0 : undefined,
            display: 'none',
            zIndex: 0,
            // position: 'relative'
        },
        rightwardExit: {
            x: slide ? '100%' : undefined,
            opacity: fade ? 0 : undefined,
            zIndex: 0,
            // position: 'relative'
        },
        rightOut: {
            x: slide ? '100%' : undefined,
            opacity: fade ? 0 : undefined,
            display: 'none',
            zIndex: 0,
            // position: 'relative'
        },
        center: {
            x: 0,
            opacity: 1,
            zIndex: 1,
            // position: 'relative'
        },
    };

    // Handle animation directions and opacity given based on active, prevActive and this item's index
    const { active, next: isNext, prevActive } = state;
    let animate = 'center';
    if (index === active)
        animate = 'center';
    else if (index === prevActive)
    {
        animate = isNext ? 'leftwardExit' : 'rightwardExit';
        if (active === maxIndex && index === 0) animate = 'rightwardExit';
        if (active === 0 && index === maxIndex) animate = 'leftwardExit'
    }
    else
    {
        animate = index < active ? 'leftOut' : 'rightOut';
        if (active === maxIndex && index === 0) animate = 'rightOut';
        if (active === 0 && index === maxIndex) animate = 'leftOut'
    }

    duration = duration / 1000;

    return (
        <StyledItem ref={divRef}>
            <AnimatePresence custom={isNext}>
                <motion.div {...(swipe && dragProps)}>
                    <motion.div
                        custom={isNext}
                        variants={variants}
                        animate={animate}
                        transition={{
                            x: { type: "tween", duration: duration, delay: 0 },
                            opacity: { duration: duration },
                        }}
                        style={{ position: 'relative' }}
                    >
                        {child}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </StyledItem>
    )
}