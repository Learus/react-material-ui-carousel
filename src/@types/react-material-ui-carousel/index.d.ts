
    import React, { ReactNode } from 'react';

    export interface CarouselProps {
        indicators?: boolean,
        autoPlay?: boolean,
        interval?: number,
        animation?: 'fade' | 'slide',
        children?: ReactNode,
        className?: string
    }
    
    declare const Carousel: React.ComponentType<CarouselProps>;
    
    export default Carousel;