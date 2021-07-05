import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { createStyles, makeStyles, Theme, Fade, Slide, SlideProps, FadeProps, IconButton } from '@material-ui/core';
import { CarouselProps, CarouselStyleProps } from '../@types/react-material-ui-carousel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';

const styles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: "relative",
        overflow: "hidden",
        // display: 'flex',
        // flexDirection: 'column'
    },
    item: {
        position: "absolute",
        // height: 'inherit',
        width: '100%',
    //    flexGrow: 1
    },
    itemWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    indicators: {
        width: "100%",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        cursor: "pointer",
        transition: "200ms",
        padding: 0,
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    indicatorIcon: {
        fontSize: "15px",
    },
    active: {
        color: "#494949"
    },
    buttonWrapper: {
        position: "absolute",
        height: "100px",
        backgroundColor: "transparent",
        top: "calc(50% - 70px)",
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: "0.4"
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "100%", // This is 100% - indicator height - indicator margin
        top: "0"
    },
    fullHeightHoverButton: {

    },
    buttonVisible: {
        opacity: "1"
    },
    buttonHidden: {
        opacity: "0",
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "calc(50% - 20px) !important",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        },
    },
    next: {
        right: 0
    },
    prev: {
        left: 0
    }
}))

interface SanitizedCarouselProps extends CarouselProps {
    className: string,
    children: ReactNode,

    index: number,
    strictIndexing: boolean,

    autoPlay: boolean,
    stopAutoPlayOnHover: boolean,
    interval: number,

    animation: "fade" | "slide",
    timeout: number | {
        appear?: number | undefined;
        enter?: number | undefined;
        exit?: number | undefined;
    },

    swipe: boolean,

    navButtonsAlwaysInvisible: boolean,
    navButtonsAlwaysVisible: boolean,
    cycleNavigation: boolean,
    fullHeightHover: boolean,
    navButtonsWrapperProps: SanitizedCarouselStyleProps,
    navButtonsProps: SanitizedCarouselStyleProps,
    NavButton: (({ onClick, next, className, style, prev }: { onClick: Function; className: string; style: React.CSSProperties; next: boolean; prev: boolean; }) => ReactNode) | undefined,

    NextIcon: ReactNode,
    PrevIcon: ReactNode,

    indicators: boolean,
    indicatorContainerProps: SanitizedCarouselStyleProps,
    indicatorIconButtonProps: SanitizedCarouselStyleProps,
    activeIndicatorIconButtonProps: SanitizedCarouselStyleProps,
    IndicatorIcon: ReactNode,

    onChange: Function,
    changeOnFirstRender: boolean,
    next: Function,
    prev: Function
}

interface SanitizedCarouselStyleProps {
    style: React.CSSProperties,
    className: string
}

const sanitizeStyleProps = (props: CarouselStyleProps | undefined): SanitizedCarouselStyleProps => {
    return props !== undefined ? {
        style: props.style !== undefined ? props.style : {},
        className: props.className !== undefined ? props.className : ""
    } : { style: {}, className: "" }
}

const sanitizeProps = (props: CarouselProps): SanitizedCarouselProps => {
    const animation = props.animation !== undefined ? props.animation : "fade";
    const timeout = props.timeout !== undefined ? props.timeout : (animation === "fade" ? 500 : 200);

    return {
        className: props.className !== undefined ? props.className : "",
        children: props.children ? props.children : [],

        index: props.index !== undefined ? props.index : 0,
        strictIndexing: props.strictIndexing !== undefined ? props.strictIndexing : true,

        autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
        stopAutoPlayOnHover: props.stopAutoPlayOnHover !== undefined ? props.stopAutoPlayOnHover : true,
        interval: props.interval !== undefined ? props.interval : 4000,

        animation: animation,
        timeout: timeout,

        swipe: props.swipe !== undefined ? props.swipe : true,

        navButtonsAlwaysInvisible: props.navButtonsAlwaysInvisible !== undefined ? props.navButtonsAlwaysInvisible : false,
        navButtonsAlwaysVisible: props.navButtonsAlwaysVisible !== undefined ? props.navButtonsAlwaysVisible : false,
        cycleNavigation: props.cycleNavigation !== undefined ? props.cycleNavigation : true,
        fullHeightHover: props.fullHeightHover !== undefined ? props.fullHeightHover : true,
        navButtonsWrapperProps: sanitizeStyleProps(props.navButtonsWrapperProps),
        navButtonsProps: sanitizeStyleProps(props.navButtonsProps),
        NavButton: props.NavButton,

        NextIcon: props.NextIcon !== undefined ? props.NextIcon : <NavigateNextIcon />,
        PrevIcon: props.PrevIcon !== undefined ? props.PrevIcon : <NavigateBeforeIcon />,

        indicators: props.indicators !== undefined ? props.indicators : true,
        indicatorContainerProps: sanitizeStyleProps(props.indicatorContainerProps),
        indicatorIconButtonProps: sanitizeStyleProps(props.indicatorIconButtonProps),
        activeIndicatorIconButtonProps: sanitizeStyleProps(props.activeIndicatorIconButtonProps),
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
        next: true
    });
    const [height, setHeight] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);

    const classes = styles();

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
    }, [sanitizedProps.index, sanitizedProps.children])

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
        const { onChange, timeout, children, strictIndexing } = sanitizedProps;

        if (Array.isArray(children))
        {
            if (strictIndexing && index > children.length -1) index = children.length - 1;
            if (strictIndexing && index < 0) index = 0;
        }
        else
        {
            index = 0;
        }

        if (runCallbacks)
        {
            isNext ? sanitizedProps.next(index, state.active) : sanitizedProps.prev(index, state.active);
            sanitizedProps.onChange(index, state.active);
        }

        setState({
            active: index,
            next: isNext
        })
    }

    const {
        children,
        className,
        
        stopAutoPlayOnHover,
        animation,
        timeout,
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

    const buttonVisibilityClassValue = `${navButtonsAlwaysVisible ? classes.buttonVisible : classes.buttonHidden}`;
    const buttonCssClassValue = `${classes.button} ${buttonVisibilityClassValue} ${fullHeightHover ? classes.fullHeightHoverButton : ""} ${navButtonsProps.className}`;
    const buttonWrapperCssClassValue = `${classes.buttonWrapper} ${fullHeightHover ? classes.fullHeightHoverWrapper : ""} ${navButtonsWrapperProps.className}`;

    const showButton = (next = true) => {
        if (cycleNavigation) return true;

        const last = Array.isArray(children) ? children.length - 1 : 0;

        if (next && state.active + 1 > last) return false;
        if (!next && state.active - 1 < 0) return false;

        return true;
    }

    return (
        <div
            className={`${classes.root} ${className ? className : ""}`}
            onMouseOver={() => {stopAutoPlayOnHover && setPaused(true)}}
            onMouseOut={() => {stopAutoPlayOnHover && setPaused(false)}}
        >
            <div className={classes.itemWrapper} style={{height: height}}>
                {   
                    Array.isArray(children) ? 
                        children.map( (child, index) => {
                            return (
                                <CarouselItem 
                                    key={`carousel-item${index}`}
                                    active={index === state.active}
                                    isNext={state.next}
                                    child={child}
                                    animation={animation}
                                    timeout={timeout}
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
                            active={true}
                            isNext={state.next}
                            child={children}
                            animation={animation}
                            timeout={timeout}
                            setHeight={setHeight}
                        />
                }
            </div>


                {!navButtonsAlwaysInvisible && showButton(true) &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.next}`} style={navButtonsWrapperProps.style}>
                        {NavButton !== undefined ?
                            NavButton({onClick: next, className: buttonCssClassValue, style: navButtonsProps.style, next: true, prev: false})
                            :
                            <IconButton className={`${buttonCssClassValue}`} onClick={next} aria-label="Next" style={navButtonsProps.style}>
                                {NextIcon}
                            </IconButton>
                        }
                    </div>
                }

                {!navButtonsAlwaysInvisible && showButton(false) &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.prev}`} style={navButtonsWrapperProps.style}>
                        {NavButton !== undefined ?
                            NavButton({onClick: prev, className: buttonCssClassValue, style: navButtonsProps.style, next: false, prev: true})
                            :
                            <IconButton className={`${buttonCssClassValue}`} onClick={prev} aria-label="Previous" style={navButtonsProps.style}>
                                {PrevIcon}
                            </IconButton>
                        }
                    </div>
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
        </div>
    )
}

interface CarouselItemProps {
    animation: 'fade' | 'slide',
    next?: Function,
    prev?: Function,
    swipe?: boolean,
    active: boolean,
    isNext: boolean,
    timeout: number | {
        appear?: number | undefined;
        enter?: number | undefined;
        exit?: number | undefined;
    },
    child: ReactNode,
    setHeight: Function
}

const CarouselItem = ({ animation, next, prev, swipe, active, isNext, timeout, child, setHeight }: CarouselItemProps) =>
{
    const classes = styles();

    let swipeHandlers: SwipeableHandlers | {} = useSwipeable({
        onSwipedLeft: () => next && next(),
        onSwipedRight: () => prev && prev()
    })

    swipeHandlers = swipe ? swipeHandlers : {};

    const Animation = animation === 'slide' ? Slide : Fade;
    let animationProps: SlideProps & FadeProps = {
        in: active,
        timeout: timeout,
        style: {zIndex: active ? 2 : 1}
    };

    const divRef = useRef<any>(null);

    useEffect(() => {
        if (divRef.current)
        {
            setHeight(divRef.current.offsetHeight);
        }
    }, [divRef])

    if (animation === 'slide') animationProps = {
        direction: active ? (isNext ? 'left' : 'right') : (isNext ? 'right' : 'left'),
        ...animationProps
    }

    return (
        <div {...swipeHandlers} className={classes.item} ref={divRef}>
            <Animation {...animationProps}>
                <div>
                    {child}
                </div>
            </Animation>
        </div>
    )
}

interface IndicatorProps {
    IndicatorIcon?: ReactNode,
    length: number,
    active: number,
    press: Function,
    indicatorContainerProps: SanitizedCarouselStyleProps,
    indicatorIconButtonProps: SanitizedCarouselStyleProps,
    activeIndicatorIconButtonProps: SanitizedCarouselStyleProps,
}

const Indicators = (props: IndicatorProps) =>
{
    const classes = styles();
    const IndicatorIcon = props.IndicatorIcon !== undefined ? props.IndicatorIcon :
        <FiberManualRecordIcon 
            // size='small'
            className={classes.indicatorIcon}
        />
    ;

    let indicators = [];
    for (let i = 0; i < props.length; i++)
    {
        const className = i === props.active ? 
            `${classes.indicator} ${props.indicatorIconButtonProps.className} ${classes.active} ${props.activeIndicatorIconButtonProps.className}`: 
            `${classes.indicator} ${props.indicatorIconButtonProps.className}`;

        const style = i === props.active ?
            Object.assign({}, props.indicatorIconButtonProps.style, props.activeIndicatorIconButtonProps.style) :
            props.indicatorIconButtonProps.style;

        const item =    <IconButton 
                            key={i} 
                            className={className} 
                            style={style} 
                            onClick={() => {props.press(i)}}
                            size='small'
                        >
                            {IndicatorIcon}
                        </IconButton>

        indicators.push(item);
    }

    const wrapperStyle = props.indicatorContainerProps !== undefined ? props.indicatorContainerProps.style : undefined;
    const wrapperClassName = props.indicatorContainerProps !== undefined ? props.indicatorContainerProps.className: "";

    return (
        <div className={`${classes.indicators} ${wrapperClassName}`} style={wrapperStyle}>
            {indicators}
        </div>
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
    }, [delay]);
}

export default Carousel;