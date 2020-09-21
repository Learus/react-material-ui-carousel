import React, { Component } from 'react';
import {Fade, Slide, IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import autoBind from 'auto-bind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useSwipeable } from 'react-swipeable';

const styles = {
    root: {
        position: "relative",
        overflow: "hidden"
    },
    indicators: {
        width: "100%",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        fontSize: "15px",
        cursor: "pointer",
        transition: "200ms",
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
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
                opacity: 0.4
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "calc(100% - 20px - 10px) !important",
        top: "0 !important"
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "30px",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        }
    },
    fullHeightHoverButton: {
        top: "calc(50% - 20px) !important"
    },
    buttonVisible:{
        opacity: "0.6"
    },
    buttonHidden:{
        opacity: "0",
    },
    next: {
        right: 0
    },
    prev: {
        left: 0
    }
}

const sanitizeProps = (props) =>
{
    const animation = props.animation !== undefined ? props.animation: "fade";

    return {
        children: props.children ? props.children : [],
        startAt: props.startAt !== undefined ? props.startAt : 0,
        strictIndexing: props.strictIndexing !== undefined ? props.strictIndexing : true,
        autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
        interval: props.interval !== undefined ? props.interval : 4000,
        indicators: props.indicators !== undefined ? props.indicators : true,
        navButtonsAlwaysInvisible: props.navButtonsAlwaysInvisible !== undefined ? props.navButtonsAlwaysInvisible : false,
        navButtonsAlwaysVisible: props.navButtonsAlwaysInvisible !== undefined ? props.navButtonsAlwaysVisible : false,
        animation: animation,
        timeout: props.timeout !== undefined ? props.timeout : (animation === "fade" ? 500 : 200),
        fullHeightHover: props.fullHeightHover !== undefined ? props.fullHeightHover : true,
        indicatorContainerProps: props.indicatorContainerProps,
        indicatorProps: props.indicatorProps,
        activeIndicatorProps: props.activeIndicatorProps,
        onChange: props.onChange !== undefined ? props.onChange : () => {},
        // Leaving below functions unsanitizedProps for conditional callback purposes
        next: props.onChange,
        prev: props.onChange,
        className: props.className !== undefined ? props.className : ""
    }
}

class Carousel extends Component
{
    constructor(props)
    {
        super(props);
        autoBind(this);

        let {
            children,
            strictIndexing,
            startAt,
        } = sanitizeProps(this.props);

        // if startAt is bigger than the children length, set it to be the last child (if strictIndexing)
        startAt = Array.isArray(children) ? (strictIndexing && startAt > children.length - 1 ? children.length - 1 : startAt) : 0

        this.state = {
            active: startAt,
            prevActive: startAt,
            displayed: startAt,
        }

        this.timer = null;
    }

    componentDidMount()
    {
        this.start();
    }

    componentWillUnmount()
    {
        this.stop();
    }

    componentDidUpdate(prevProps, prevState)
    {
        prevProps = sanitizeProps(prevProps);
        const { autoPlay, interval, children, startAt } = sanitizeProps(this.props);

        if (autoPlay !== prevProps.autoPlay || interval !== prevProps.interval)
        {
            this.reset();
        }

        if (children.length !== prevProps.children.length)
        {
            this.pressIndicator(startAt);
        }
    }

    stop()
    {
        if (this.timer)
        {
            clearInterval(this.timer)
            this.timer = null;
        }
    }

    start()
    {
        const { autoPlay, interval } = sanitizeProps(this.props);

        if (autoPlay)
        {
            this.timer = setInterval(this.next, interval);
        }
    }

    reset()
    {
        const { autoPlay } = sanitizeProps(this.props);
        this.stop();

        if (autoPlay)
        {
            this.start();
        }
    }

    pressIndicator(index)
    {
        const { onChange, timeout } = sanitizeProps(this.props);

        this.setState({
            active: index,
            prevActive: this.state.active,
            displayed: this.state.active
        }, this.reset);

        setTimeout(() => {
            this.setState({
                displayed: index
            }, () => onChange(index, this.state.active))
        }, timeout);
    }

    next(event)
    {
        const { children, next, onChange, timeout } = sanitizeProps(this.props);

        const prevActive = this.state.active;
        const nextActive = this.state.active + 1 > children.length - 1 ? 0 : this.state.active + 1;

        /**
         * Callback to be called after setting the state. Will be:
         * * () => {} | if !props.next && !props.onChange
         * * props.onChange | if !props.next && props.onChange
         * * props.next | if props.next
         */
        const userNext = next !== undefined ? next : onChange;


        this.setState({
            active: nextActive,
            prevActive: prevActive,
            displayed: prevActive
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: nextActive
            }, () => userNext(nextActive, prevActive))
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const { children, prev, onChange, timeout } = sanitizeProps(this.props);

        const prevActive = this.state.active;
        const nextActive = this.state.active - 1 < 0 ? children.length - 1 : this.state.active - 1;

        /**
         * Callback to be called after setting the state. Will be:
         * * () => {} | if !props.prev && !props.onChange
         * * props.onChange | if !props.prev && props.onChange
         * * props.prev | if props.prev
         */
        const userPrev = prev !== undefined ? prev : onChange;


        this.setState({
            active: nextActive,
            prevActive: prevActive,
            displayed: prevActive
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: nextActive
            }, userPrev(nextActive, prevActive))
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    render()
    {
        const {
            children,
            indicators,
            navButtonsAlwaysInvisible,
            navButtonsAlwaysVisible,
            animation,
            timeout,
            fullHeightHover,
            indicatorContainerProps,
            indicatorProps,
            activeIndicatorProps,
            className,
        } = sanitizeProps(this.props);

        const classes = this.props.classes;
        
        const buttonCssClassValue = `${classes.button} ${navButtonsAlwaysVisible ? classes.buttonVisible: classes.buttonHidden } ${fullHeightHover ? classes.fullHeightHoverButton : ""}`;
        const buttonWrapperCssClassValue = `${classes.buttonWrapper} ${fullHeightHover ? classes.fullHeightHoverWrapper : ""}`;

        const compareActiveDisplayed = () => {
            if (this.state.active === 0 && this.state.prevActive === children.length - 1)
            {
                return true;
            }

            if (this.state.active === children.length - 1 && this.state.prevActive === 0)
            {
                return false;
            }

            if (this.state.active > this.state.prevActive)
            {
                return true;
            }

            return false;
        }

        return (
            <div className={`${classes.root} ${className ? className : ""}`} onMouseEnter={this.stop} onMouseOut={this.reset}>
                {   
                    Array.isArray(children) ? 
                       children.map( (child, index) => {
                            return (
                                <CarouselItem 
                                    key={`carousel-item${index}`}
                                    display={index === this.state.displayed ? true : false}
                                    active={index === this.state.active ? true : false}
                                    isNext={compareActiveDisplayed()}
                                    child={child}
                                    animation={animation}
                                    timeout={timeout}
                                    next={this.next}
                                    prev={this.prev}
                                />
                            )
                        })
                        :
                        <CarouselItem
                            key={`carousel-item0`}
                            display={true}
                            active={true}
                            child={children}
                            animation={animation}
                            timeout={timeout}
                            // next={this.next}
                            // prev={this.prev}
                        />
                }
                
                {!navButtonsAlwaysInvisible && 
                    <div className={`${buttonWrapperCssClassValue} ${classes.next}`}>
                        <IconButton className={`${buttonCssClassValue} ${classes.next}`} onClick={this.next} aria-label="Next">
                            <NavigateNextIcon/>
                        </IconButton>
                    </div>
                }

                {!navButtonsAlwaysInvisible &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.prev}`}>
                        <IconButton className={`${buttonCssClassValue}  ${classes.prev}`} onClick={this.prev} aria-label="Previous">
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </div>
                }
                
                {
                    indicators ? 
                    <Indicators
                        classes={classes}
                        length={children.length}
                        active={this.state.active}
                        press={this.pressIndicator}
                        indicatorContainerProps={indicatorContainerProps}
                        indicatorProps={indicatorProps}
                        activeIndicatorProps={activeIndicatorProps}
                    /> : null
                }
            </div>
        )
    }
}

function CarouselItem(props)
{
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => props.next(),
        onSwipedRight: () => props.prev()
    })

    return (
        props.display ? (
            <div {...swipeHandlers} className="CarouselItem" >
                {props.animation === "slide" ?
                    <Slide direction={props.active ? (props.isNext ? "left" : "right") : (props.isNext ? "right" : "left")} in={props.active} timeout={props.timeout}>
                        <div>
                            {props.child}
                        </div>
                    </Slide>
                    :
                    <Fade in={props.active} timeout={props.timeout}>
                        <div>
                            {props.child}
                        </div>
                    </Fade>
                }
            </div>
        ) : null
    )
}

function Indicators(props)
{
    const classes = props.classes;

    let indicators = [];
    for (let i = 0; i < props.length; i++)
    {
        const style = props.indicatorProps !== undefined ? props.indicatorProps.style : undefined;
        let className = props.indicatorProps !== undefined ? props.indicatorProps.className : undefined;
        const activeStyle = props.activeIndicatorProps !== undefined ? props.activeIndicatorProps.style : undefined;
        const activeClassName = props.activeIndicatorProps !== undefined ? props.activeIndicatorProps.className : undefined;


        className = i === props.active ? 
            `${classes.indicator} ${classes.active} ${activeClassName}`: 
            `${classes.indicator} ${className}`;

        const item = <FiberManualRecordIcon 
                        key={i}
                        size='small'
                        className={className}
                        style={i === props.active ? activeStyle : style}
                        onClick={() => {props.press(i)}}
                    />;

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

export default withStyles(styles)(Carousel);
