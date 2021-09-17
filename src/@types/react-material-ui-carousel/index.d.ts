
import React, { ReactNode, AriaAttributes } from 'react';

export interface CarouselNavProps extends AriaAttributes {
    className?: string,
    style?: React.CSSProperties
}

export interface CarouselProps {
    children?: ReactNode,

    /** Defines custom class name(s), that will be added to Carousel element */
    className?: string,

    /** Defines which child (assuming there are more than 1 children) will be displayed. Next and Previous Buttons as well as Indicators will work normally after the first render. When this prop is updated the carousel will display the chosen child. Use this prop to programmatically set the active child. If (index > children.length) then if (strictIndexing) index = last element. index */
    index?: number,

    /** Defines whether index can be bigger than children length */
    strictIndexing?: boolean,

    /** Defines if the component will auto scroll between children */
    autoPlay?: boolean,

    /** Defines if auto scrolling will continue while mousing over carousel */
    stopAutoPlayOnHover?: boolean,

    /** Defines the interval in ms between active child changes (autoPlay) */
    interval?: number,

    /** Defines the animation style of the Carousel  */
    animation?: 'fade' | 'slide',

    /** Defines whether the animation from the last child towards the first will be reverse. Same for the animation from the first child towards the last */
    reverseEdgeAnimationDirection?: boolean

    /** Defines the duration of the animations. For more information refer to the [Material UI Documentation for Transitions](https://material-ui.com/components/transitions/) */
    timeout?: number | { appear?: number, enter?: number, exit?: number },

    /** Defines if swiping left and right (in touch devices) triggers `next` and `prev` behaviour */
    swipe?: boolean,

    /** Defines the existence of bullet indicators */
    indicators?: boolean,

    /** Defines if the next/previous buttons will always be visible or not */
    navButtonsAlwaysVisible?: boolean,

    /**	Defines if the next/previous buttons will always be invisible or not */
    navButtonsAlwaysInvisible?: boolean,

    /** Defines if the next button will be visible on the last slide, and the previous button on the first slide. Auto-play also stops on the last slide. Indicators continue to work normally. */
    cycleNavigation?: boolean,

    /** Defines if the the next/previous button wrappers will cover the full height of the Item element and show buttons on full height hover */
    fullHeightHover?: boolean,

    /** Used to customize the div surrounding the nav `IconButtons`. Use this to position the buttons onto, below, outside, e.t.c. the carousel. */
    navButtonsWrapperProps?: CarouselNavProps,

    /** Used to customize the actual nav `IconButton`s */
    navButtonsProps?: CarouselNavProps,

    /** Defines the element inside the nav "next" `IconButton`. Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples.  
     * It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like. */
    NextIcon?: ReactNode,

    /** Defines the element inside the nav "prev" `IconButton`. Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples.  
     * It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like. */
    PrevIcon?: ReactNode,

    /** Gives full control of the nav buttons. Should return a button that uses the given `onClick`.  
     * Works in tandem with all other customization options (`navButtonsProps`, `navButtonsWrapperProps`, `navButtonsAlwaysVisible`, `navButtonsAlwaysInvisible`, `fullHeightHover` ...).  
     * Refer to the [example section](README.md) for more information */
    NavButton?: ({ onClick, next, className, style, prev }: { onClick: Function, className: string, style: React.CSSProperties, next: boolean, prev: boolean }) => ReactNode

    /** Used to customize the indicators container/wrapper.  
     * Type: `{className: string, style: React.CSSProperties}` */
    indicatorContainerProps?: CarouselNavProps,

    /** Used to customize the **non-active** indicator `IconButton`s.  
     * Type: `{className: string, style: React.CSSProperties}` */
    indicatorIconButtonProps?: CarouselNavProps,

    /** Used to customize the **active** indicator `IconButton`.  
     * Type: `{className: string, style: React.CSSProperties}` */
    activeIndicatorIconButtonProps?: CarouselNavProps,

    /** Function that is called **after** internal `setActive()` method. The `setActive()` method is called when the next and previous buttons are pressed, when an indicator is pressed, or when the `index` prop changes. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**. Will be c */
    onChange?: Function,

    /** Defines if `onChange` prop will be called when the carousel renders for the first time. In `componentDidMount` */
    changeOnFirstRender?: boolean,

    /** Function that is called **after** internal `next()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed** */
    next?: Function,

    /** Function that is called **after** internal `prev()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed** */
    prev?: Function,

    /** Defines the element inside the indicator `IconButton`s Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples.  
     * It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like.*/
    IndicatorIcon?: ReactNode,

}

declare const Carousel: React.ComponentType<CarouselProps>;

export default Carousel;