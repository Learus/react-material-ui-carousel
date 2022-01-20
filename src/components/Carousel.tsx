import React, { ReactNode, ReactNodeArray, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CarouselNavProps, CarouselProps } from './types'

import { IconButton, styled } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import { AnimatePresence, motion, MotionProps, PanInfo } from 'framer-motion'

const StyledRoot = styled("div")({
    position: "relative",
    overflow: "hidden",
    // display: 'flex',
    // flexDirection: 'column'
});

const StyledItem = styled("div")({
    position: "absolute",
    // height: 'inherit',
    width: '100%',
    //    flexGrow: 1
});

const StyledItemWrapper = styled("div")({
    position: 'relative',
    width: '100%',
    height: '100%',
});

const StyledIndicators = styled("div")({
    width: "100%",
    marginTop: "10px",
    textAlign: "center"
});

const StyledFiberManualRecordIcon = styled(FiberManualRecordIcon)({
    fontSize: "15px",
});

const StyledIndicatorIconButton = styled(
  IconButton,
  { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $active: boolean }>(({ $active }) => ({
    cursor: "pointer",
    transition: "200ms",
    padding: 0,
    color: $active ? "#494949" : "#afafaf",
    '&:hover': {
        color: $active ? "#494949" : "#1f1f1f",
    },
    '&:active': {
        color: $active ? "#494949" : "#1f1f1f",
    }
}));

const StyledIconButton = styled(
  IconButton,
  { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $alwaysVisible: boolean; $fullHeightHover: boolean }>(({ $alwaysVisible }) => ({
    margin: "0 10px",
    position: "relative",
    backgroundColor: "#494949",
    top: "calc(50% - 20px) !important",
    color: "white",
    fontSize: "30px",
    transition: "200ms",
    cursor: "pointer",
    opacity: $alwaysVisible ? '1' : '0',
    '&:hover': {
        opacity: "0.6",
        backgroundColor: "#494949",
    },
}));

const StyledButtonWrapper = styled(
  "div",
  { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $next: boolean; $prev: boolean; $fullHeightHover: boolean }>(({ $next, $prev, $fullHeightHover }) => ({
    position: "absolute",
    height: "100px",
    backgroundColor: "transparent",
    zIndex: 1,
    top: "calc(50% - 70px)",
    '&:hover': {
      '& $button': {
        backgroundColor: "black",
        filter: "brightness(120%)",
        opacity: "0.4"
      }
    },
    ...($fullHeightHover ? {
      height: "100%", // This is 100% - indicator height - indicator margin
      top: "0"
    } : undefined),
    ...($next ? { right: 0 } : undefined),
    ...($prev ? { left: 0 } : undefined),
}));

interface SanitizedCarouselProps extends CarouselProps {
    sx: SxProps<Theme>,
    className: string,
    children: ReactNode,

    index: number,
    strictIndexing: boolean,

    autoPlay: boolean,
    stopAutoPlayOnHover: boolean,
    interval: number,

    animation: "fade" | "slide",
    duration: number,

    swipe: boolean,

    navButtonsAlwaysInvisible: boolean,
    navButtonsAlwaysVisible: boolean,
    cycleNavigation: boolean,
    fullHeightHover: boolean,
    navButtonsWrapperProps: SanitizedCarouselNavProps,
    navButtonsProps: SanitizedCarouselNavProps,
    NavButton: (({ onClick, next, className, style, prev }: { onClick: Function; className: string; style: React.CSSProperties; next: boolean; prev: boolean; }) => ReactNode) | undefined,

    NextIcon: ReactNode,
    PrevIcon: ReactNode,

    indicators: boolean,
    indicatorContainerProps: SanitizedCarouselNavProps,
    indicatorIconButtonProps: SanitizedCarouselNavProps,
    activeIndicatorIconButtonProps: SanitizedCarouselNavProps,
    IndicatorIcon: ReactNode,

    onChange: (now?: number, previous?: number) => any,
    changeOnFirstRender: boolean,
    next: (now?: number, previous?: number) => any,
    prev: (now?: number, previous?: number) => any
}

interface SanitizedCarouselNavProps extends CarouselNavProps {
    style: React.CSSProperties,
    className: string
};

const sanitizeNavProps = (props: CarouselNavProps | undefined): SanitizedCarouselNavProps => {
    const { className, style, ...rest } = props || {};

    return props !== undefined ? {
        style: props.style !== undefined ? props.style : {},
        className: props.className !== undefined ? props.className : "",
        ...rest
    } : { style: {}, className: "", ...rest }
}

const sanitizeProps = (props: CarouselProps): SanitizedCarouselProps => {
    const animation = props.animation !== undefined ? props.animation : "fade";
    const duration = props.duration !== undefined ? props.duration : (animation === "fade" ? 500 : 200);

    return {
        sx: props.sx !== undefined ? props.sx : {},
        className: props.className !== undefined ? props.className : "",
        children: props.children ? props.children : [],

        index: props.index !== undefined ? props.index : 0,
        strictIndexing: props.strictIndexing !== undefined ? props.strictIndexing : true,

        autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
        stopAutoPlayOnHover: props.stopAutoPlayOnHover !== undefined ? props.stopAutoPlayOnHover : true,
        interval: props.interval !== undefined ? props.interval : 4000,

        animation: animation,
        duration: duration,

        swipe: props.swipe !== undefined ? props.swipe : true,

        navButtonsAlwaysInvisible: props.navButtonsAlwaysInvisible !== undefined ? props.navButtonsAlwaysInvisible : false,
        navButtonsAlwaysVisible: props.navButtonsAlwaysVisible !== undefined ? props.navButtonsAlwaysVisible : false,
        cycleNavigation: props.cycleNavigation !== undefined ? props.cycleNavigation : true,
        fullHeightHover: props.fullHeightHover !== undefined ? props.fullHeightHover : true,
        navButtonsWrapperProps: sanitizeNavProps(props.navButtonsWrapperProps),
        navButtonsProps: sanitizeNavProps(props.navButtonsProps),
        NavButton: props.NavButton,

        NextIcon: props.NextIcon !== undefined ? props.NextIcon : <NavigateNextIcon />,
        PrevIcon: props.PrevIcon !== undefined ? props.PrevIcon : <NavigateBeforeIcon />,

        indicators: props.indicators !== undefined ? props.indicators : true,
        indicatorContainerProps: sanitizeNavProps(props.indicatorContainerProps),
        indicatorIconButtonProps: sanitizeNavProps(props.indicatorIconButtonProps),
        activeIndicatorIconButtonProps: sanitizeNavProps(props.activeIndicatorIconButtonProps),
        IndicatorIcon: props.IndicatorIcon,

        onChange: props.onChange !== undefined ? props.onChange : () => { },
        changeOnFirstRender: props.changeOnFirstRender !== undefined ? props.changeOnFirstRender : false,
        next: props.next !== undefined ? props.next : () => { },
        prev: props.prev !== undefined ? props.prev : () => { },

    }
}


export const Carousel = (props: CarouselProps) => {

    const [state, setState] = useState({
        active: 0,
        prevActive: 0,
        next: true
    });
    const [height, setHeight] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);

    const sanitizedProps = sanitizeProps(props);

    // componentDidMount
    useEffect(() => {
        const { index, changeOnFirstRender } = sanitizedProps;
        setNext(index, true, changeOnFirstRender);
    }, [])

    useInterval(() => {
        const { autoPlay } = sanitizedProps;

        if (autoPlay && !paused) {
            next(undefined);
        }

    }, sanitizedProps.interval)

    useEffect(() => {
        setNext(sanitizedProps.index, true);
    }, [])

    const next = (event: any) => {
        const { children, cycleNavigation } = sanitizedProps;

        let last = Array.isArray(children) ? children.length - 1 : 0;
        const nextActive = state.active + 1 > last ? (cycleNavigation ? 0 : state.active) : state.active + 1;

        setNext(nextActive, true)

        if (event)
            event.stopPropagation();
    }

    const prev = (event: any) => {
        const { children, cycleNavigation } = sanitizedProps;

        let last = Array.isArray(children) ? children.length - 1 : 0;
        const nextActive = state.active - 1 < 0 ? (cycleNavigation ? last : state.active) : state.active - 1;

        setNext(nextActive, false)

        if (event)
            event.stopPropagation();
    }

    const setNext = (index: number, isNext: boolean, runCallbacks: boolean = true) => {
        const { onChange, children, strictIndexing } = sanitizedProps;

        if (Array.isArray(children)) {
            if (strictIndexing && index > children.length - 1) index = children.length - 1;
            if (strictIndexing && index < 0) index = 0;
        }
        else {
            index = 0;
        }

        if (runCallbacks) {
            if (isNext !== undefined)
                isNext ? sanitizedProps.next(index, state.active) : sanitizedProps.prev(index, state.active);

            onChange(index, state.active);
        }

        if (isNext === undefined) {
            isNext = index > state.active
        }

        setState({
            active: index,
            prevActive: state.active,
            next: isNext
        })
    }


    const {
        children,
        sx,
        className,

        stopAutoPlayOnHover,
        animation,
        duration,
        swipe,

        navButtonsAlwaysInvisible,
        navButtonsAlwaysVisible,
        cycleNavigation,
        fullHeightHover,
        navButtonsProps,
        navButtonsWrapperProps,
        NavButton,

        NextIcon,
        PrevIcon,

        indicators,
        indicatorContainerProps,
        indicatorIconButtonProps,
        activeIndicatorIconButtonProps,
        IndicatorIcon,
    } = sanitizedProps;

    const { className: buttonsClass, style: buttonsStyle, ...buttonsProps } = navButtonsProps;
    const { className: buttonsWrapperClass, style: buttonsWrapperStyle, ...buttonsWrapperProps } = navButtonsWrapperProps;

    const showButton = (next = true) => {
        if (cycleNavigation) return true;

        const last = Array.isArray(children) ? children.length - 1 : 0;

        if (next && state.active === last) return false;
        if (!next && state.active === 0) return false;

        return true;
    }

    return (
        <StyledRoot
            sx={sx}
            className={className}
            onMouseOver={() => { stopAutoPlayOnHover && setPaused(true) }}
            onMouseOut={() => { stopAutoPlayOnHover && setPaused(false) }}
        >
            <StyledItemWrapper style={{ height: height }}>
                {
                    Array.isArray(children) ?
                        children.map((child, index) => {
                            return (
                                <CarouselItem
                                    key={`carousel-item${index}`}
                                    state={state}
                                    index={index}
                                    maxIndex={children.length - 1}
                                    child={child}
                                    animation={animation}
                                    duration={duration}
                                    swipe={swipe}
                                    next={next}
                                    prev={prev}
                                    setHeight={setHeight}
                                />
                            )
                        })
                        :
                        <CarouselItem
                            key={`carousel-item0`}
                            state={state}
                            index={0}
                            maxIndex={0}
                            child={children}
                            animation={animation}
                            duration={duration}
                            setHeight={setHeight}
                        />
                }
            </StyledItemWrapper>


            {!navButtonsAlwaysInvisible && showButton(true) &&
                <StyledButtonWrapper $next $prev={false} $fullHeightHover={fullHeightHover} className={buttonsWrapperClass} style={buttonsWrapperStyle} {...buttonsWrapperProps}>
                    {NavButton !== undefined ?
                        NavButton({ onClick: next, className: buttonsClass, style: buttonsStyle, next: true, prev: false, ...buttonsProps })
                        :
                        <StyledIconButton $alwaysVisible={navButtonsAlwaysVisible} $fullHeightHover={fullHeightHover} className={buttonsClass} onClick={next} aria-label="Next" style={buttonsStyle} {...buttonsProps}>
                            {NextIcon}
                        </StyledIconButton>
                    }
                </StyledButtonWrapper>
            }

            {!navButtonsAlwaysInvisible && showButton(false) &&
                <StyledButtonWrapper $next={false} $prev $fullHeightHover={fullHeightHover} className={buttonsWrapperClass} style={buttonsWrapperStyle} {...buttonsWrapperProps}>
                    {NavButton !== undefined ?
                        NavButton({ onClick: prev, className: buttonsClass, style: navButtonsProps.style, next: false, prev: true, ...buttonsProps })
                        :
                        <StyledIconButton $alwaysVisible={navButtonsAlwaysVisible} $fullHeightHover={fullHeightHover} className={buttonsClass} onClick={prev} aria-label="Previous" style={navButtonsProps.style} {...buttonsProps}>
                            {PrevIcon}
                        </StyledIconButton>
                    }
                </StyledButtonWrapper>
            }

            {
                indicators ?
                    <Indicators
                        length={Array.isArray(children) ? children.length : 0}
                        active={state.active}
                        press={setNext}
                        indicatorContainerProps={indicatorContainerProps}
                        indicatorIconButtonProps={indicatorIconButtonProps}
                        activeIndicatorIconButtonProps={activeIndicatorIconButtonProps}
                        IndicatorIcon={IndicatorIcon}
                    /> : null
            }
        </StyledRoot>
    )
}

interface CarouselItemProps {
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

const CarouselItem = ({ animation, next, prev, swipe, state, index, maxIndex, duration, child, setHeight }: CarouselItemProps) => {
    const slide = animation === 'slide';
    const fade = animation === 'fade';

    const dragProps: MotionProps = {
        drag: 'x',
        layout: true,
        onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
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

    useEffect(() => {
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
    else if (index === prevActive) {
        animate = isNext ? 'leftwardExit' : 'rightwardExit';
        if (active === maxIndex && index === 0) animate = 'rightwardExit';
        if (active === 0 && index === maxIndex) animate = 'leftwardExit'
    }
    else {
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

interface IndicatorProps {
    IndicatorIcon?: ReactNode,
    length: number,
    active: number,
    press: Function,
    indicatorContainerProps: SanitizedCarouselNavProps,
    indicatorIconButtonProps: SanitizedCarouselNavProps,
    activeIndicatorIconButtonProps: SanitizedCarouselNavProps,
}

const Indicators = (props: IndicatorProps) => {
    const IndicatorIcon = useMemo(() => props.IndicatorIcon !== undefined ? props.IndicatorIcon : <StyledFiberManualRecordIcon />, [props.IndicatorIcon]);

    const completeListIfRequired = useCallback((arrayOfIcons: ReactNodeArray) => {
        while (arrayOfIcons.length < props.length) {
            let index = 0;
            arrayOfIcons.push(arrayOfIcons[index]);
            index += 1;
        }
    }, [props.length])

    const { className: indicatorIconButtonClass, style: indicatorIconButtonStyle, ...indicatorIconButtonProps } = props.indicatorIconButtonProps;
    const { className: activeIndicatorIconButtonClass, style: activeIndicatorIconButtonStyle, ...activeIndicatorIconButtonProps } = props.activeIndicatorIconButtonProps;

    let indicators = [];

    for (let i = 0; i < props.length; i++) {
        const className = i === props.active ?
            `${indicatorIconButtonClass} ${activeIndicatorIconButtonClass}` :
            `${indicatorIconButtonClass}`;

        const style = i === props.active ?
            Object.assign({}, indicatorIconButtonStyle, activeIndicatorIconButtonStyle) :
            indicatorIconButtonStyle;

        let restProps = i === props.active ?
            Object.assign({}, indicatorIconButtonProps, activeIndicatorIconButtonProps) :
            indicatorIconButtonProps;

        if (restProps['aria-label'] === undefined) restProps['aria-label'] = 'carousel indicator';

        const createIndicator = (IndicatorIcon: ReactNode) => {
            return (
                <StyledIndicatorIconButton
                    $active={i === props.active}
                    key={i}
                    className={className}
                    style={style}
                    onClick={() => { props.press(i) }}
                    {...restProps}
                    aria-label={`${restProps['aria-label']} ${i + 1}`}
                >
                    {IndicatorIcon}
                </StyledIndicatorIconButton>
            )
        }

        Array.isArray(IndicatorIcon)
            ? indicators.push(createIndicator(IndicatorIcon[i])) && completeListIfRequired(IndicatorIcon)
            : indicators.push(createIndicator(IndicatorIcon))

    }

    const { className: indicatorContainerClass, style: indicatorContainerStyle, ...indicatorContainerProps } = props.indicatorContainerProps;

    return (
        <StyledIndicators className={indicatorContainerClass} style={indicatorContainerStyle} {...indicatorContainerProps}>
            {indicators}
        </StyledIndicators>
    )
}

const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<Function>(() => { });

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

        return () => { };
    }, [delay]);
}

export default Carousel;