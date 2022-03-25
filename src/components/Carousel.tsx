import { CarouselItem } from './CarouselItem';
import { CarouselProps } from './types';
import { Indicators } from './Indicators';
import { sanitizeProps, useInterval } from './util';
import
{
    StyledButtonWrapper,
    StyledIconButton,
    StyledItemWrapper,
    StyledRoot
} from './Styled';
import React, { useEffect, useState } from 'react';


export const Carousel = (props: CarouselProps) =>
{

    const [state, setState] = useState({
        active: 0,
        prevActive: 0,
        next: true
    });

    /** Used to set carousel's height. It is being set by the CarouselItems */
    const [childrenHeight, setChildrenHeight] = useState<number>();
    const [paused, setPaused] = useState<boolean>(false);

    const sanitizedProps = sanitizeProps(props);

    // componentDidMount & onIndexChange
    useEffect(() =>
    {
        const { index, changeOnFirstRender } = sanitizedProps;
        setNext(index, true, changeOnFirstRender);
    }, [sanitizedProps.index])


    useInterval(() =>
    {
        const { autoPlay } = sanitizedProps;

        if (autoPlay && !paused)
        {
            next(undefined);
        }

    }, sanitizedProps.interval)



    const next = (event: any) =>
    {
        const { children, cycleNavigation } = sanitizedProps;

        let last = Array.isArray(children) ? children.length - 1 : 0;
        const nextActive = state.active + 1 > last ? (cycleNavigation ? 0 : state.active) : state.active + 1;

        setNext(nextActive, true)

        if (event)
            event.stopPropagation();
    }

    const prev = (event: any) =>
    {
        const { children, cycleNavigation } = sanitizedProps;

        let last = Array.isArray(children) ? children.length - 1 : 0;
        const nextActive = state.active - 1 < 0 ? (cycleNavigation ? last : state.active) : state.active - 1;

        setNext(nextActive, false)

        if (event)
            event.stopPropagation();
    }

    const setNext = (index: number, isNext: boolean, runCallbacks: boolean = true) =>
    {
        const { onChange, children, strictIndexing } = sanitizedProps;

        if (Array.isArray(children))
        {
            if (strictIndexing && index > children.length - 1) index = children.length - 1;
            if (strictIndexing && index < 0) index = 0;
        }
        else
        {
            index = 0;
        }

        if (runCallbacks)
        {
            if (isNext !== undefined)
                isNext ? sanitizedProps.next(index, state.active) : sanitizedProps.prev(index, state.active);

            onChange(index, state.active);
        }

        if (isNext === undefined)
        {
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

        height,

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

    const showButton = (next = true) =>
    {
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
            onFocus={()=>{stopAutoPlayOnHover && setPaused(true)}}
            onBlur={()=>{stopAutoPlayOnHover && setPaused(false)}}
            // style={{height: height}} // <-- number | undefined
        >
            <StyledItemWrapper style={{ height: height ? height : childrenHeight }}>
                {
                    Array.isArray(children) ?
                        children.map((child, index) =>
                        {
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
                                    height={height}
                                    setHeight={setChildrenHeight}
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
                            height={height}
                            setHeight={setChildrenHeight}
                        />
                }
            </StyledItemWrapper>


            {!navButtonsAlwaysInvisible && showButton(true) &&
                <StyledButtonWrapper $next $prev={false} $fullHeightHover={fullHeightHover} {...navButtonsWrapperProps}>
                    {NavButton !== undefined ?
                        NavButton({ onClick: next, next: true, prev: false, ...navButtonsProps })
                        :
                        <StyledIconButton
                            $alwaysVisible={navButtonsAlwaysVisible}
                            $fullHeightHover={fullHeightHover}
                            onClick={next}
                            aria-label="Next"
                            {...navButtonsProps}
                        >
                            {NextIcon}
                        </StyledIconButton>
                    }
                </StyledButtonWrapper>
            }

            {!navButtonsAlwaysInvisible && showButton(false) &&
                <StyledButtonWrapper $next={false} $prev $fullHeightHover={fullHeightHover} {...navButtonsWrapperProps}>
                    {NavButton !== undefined ?
                        NavButton({ onClick: prev, next: false, prev: true, ...navButtonsProps })
                        :
                        <StyledIconButton
                            $alwaysVisible={navButtonsAlwaysVisible}
                            $fullHeightHover={fullHeightHover}
                            onClick={prev}
                            aria-label="Previous"
                            {...navButtonsProps}
                        >
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

export default Carousel;