
    import React, { ReactNode } from 'react';

    export interface CarouselProps {
        indicators?: boolean,
        autoPlay?: boolean,
        navButtonsAlwaysVisible?: boolean,
        navButtonsAlwaysInvisible?: boolean,
        fullHeightHover?: boolean,
        interval?: number,
        animation?: 'fade' | 'slide',
        children?: ReactNode,
        className?: string,
        timeout?: number | { appear?: number, enter?: number, exit?: number },
        startAt?: number,
        strictIndexing?: boolean,
        indicatorProps?: {className: string, style: React.CSSProperties},
        activeIndicatorProps?: {className: string, style: React.CSSProperties},
        onChange?: Function,
        next?: Function,
        prev?: Function
    }
    
    declare const Carousel: React.ComponentType<CarouselProps>;
    
    export default Carousel;