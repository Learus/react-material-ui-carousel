import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
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
    buttonVisible:{
        opacity: "1"
    },
    buttonHidden:{
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
}

const sanitizeStyleProps = (props) =>
{
    return props !== undefined ? {
        style: props.style !== undefined ? props.style : {},
        className: props.className !== undefined ? props.className : ""
    } : {style: {}, className: ""}
}

const sanitizeProps = (props) =>
{
    const animation = props.animation !== undefined ? props.animation: "fade";
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

        NextIcon: props.NextIcon !== undefined ? props.NextIcon : <NavigateNextIcon/>,
        PrevIcon: props.PrevIcon !== undefined ? props.PrevIcon : <NavigateBeforeIcon/>,

        indicators: props.indicators !== undefined ? props.indicators : true,
        indicatorContainerProps: sanitizeStyleProps(props.indicatorContainerProps),
        indicatorIconButtonProps: sanitizeStyleProps(props.indicatorIconButtonProps),
        activeIndicatorIconButtonProps: sanitizeStyleProps(props.activeIndicatorIconButtonProps),
        IndicatorIcon: props.IndicatorIcon,

        onChange: props.onChange !== undefined ? props.onChange : () => {},
        changeOnFirstRender: props.changeOnFirstRender !== undefined ? props.changeOnFirstRender : false,
        next: props.next !== undefined ? props.next : () => {},
        prev: props.prev !== undefined ? props.prev : () => {},

    }
}

class Carousel extends Component
{
    constructor(props)
    {
        super(props);
        autoBind(this);

        this.state = {
            active: 0,
            prevActive: 0,
            displayed: 0,
        }

        this.timer = null;
    }

    componentDidMount()
    {
        const { index, changeOnFirstRender } = sanitizeProps(this.props)
        this.setActive(index, undefined, changeOnFirstRender);

        this.start();
    }

    componentWillUnmount()
    {
        this.stop();
    }

    componentDidUpdate(prevProps, prevState)
    {
        prevProps = sanitizeProps(prevProps);
        const { autoPlay, interval, children, index } = sanitizeProps(this.props);

        if (autoPlay !== prevProps.autoPlay || interval !== prevProps.interval)
        {
            this.reset();
        }

        if (children.length !== prevProps.children.length)
        {
            this.setActive(index);
        }

        if (prevProps.index !== index)
        {
            this.setActive(index)
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

    setActive(index, callback=() => {}, runCallbacks=true)
    {
        const { onChange, timeout, children, strictIndexing } = sanitizeProps(this.props);

        // if index is bigger than the children length, set it to be the last child (if strictIndexing)
        if (Array.isArray(children))
        {
            if (strictIndexing && index > children.length - 1) index = children.length - 1;
            if (strictIndexing && index < 0) index = 0;
        }
        else
        {
            index = 0;
        }

        const prevActive = this.state.active;

        this.setState({
            active: index,
            prevActive: prevActive,
            displayed: prevActive
        }, this.reset);

        setTimeout(() => {
            this.setState({
                displayed: index
            }, () => {
                if (runCallbacks)
                {
                    // Call user defined callbacks
                    callback(index, prevActive);
                    onChange(index, prevActive);
                }
            })
        }, timeout.exit ? timeout.exit : timeout);
    }

    next(event)
    {
        const { children, next, cycleNavigation } = sanitizeProps(this.props);

        const nextActive = this.state.active + 1 > children.length - 1 ? (cycleNavigation ? 0 : this.state.active) : this.state.active + 1;

        this.setActive(nextActive, next)

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const { children, prev, cycleNavigation } = sanitizeProps(this.props);

        const nextActive = this.state.active - 1 < 0 ? (cycleNavigation ? children.length - 1 : this.state.active) : this.state.active - 1;

        this.setActive(nextActive, prev)

        if (event)
            event.stopPropagation();
    }

    render()
    {
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
        } = sanitizeProps(this.props);

        const classes = this.props.classes;
        
        const buttonVisibilityClassValue = `${navButtonsAlwaysVisible ? classes.buttonVisible : classes.buttonHidden}`;
        const buttonCssClassValue = `${classes.button} ${buttonVisibilityClassValue} ${fullHeightHover ? classes.fullHeightHoverButton : ""} ${navButtonsProps.className}`;
        const buttonWrapperCssClassValue = `${classes.buttonWrapper} ${fullHeightHover ? classes.fullHeightHoverWrapper : ""} ${navButtonsWrapperProps.className}`;

        const compareActiveDisplayed = () => {
            if (this.state.active === 0 && this.state.prevActive === children.length - 1)
            {
                return false;
            }

            if (this.state.active === children.length - 1 && this.state.prevActive === 0)
            {
                return true;
            }

            if (this.state.active > this.state.prevActive)
            {
                return true;
            }

            return false;
        }

        const showButton = (next = true) => {
            if (cycleNavigation) return true;

            if (next && this.state.active + 1 > children.length - 1) return false;
            if (!next && this.state.active - 1 < 0) return false;

            return true;
        }

        return (
            <div
                className={`${classes.root} ${className ? className : ""}`}
                onMouseOver={() => {stopAutoPlayOnHover && this.stop()}}
                onMouseOut={() => {stopAutoPlayOnHover && this.reset()}}
            >
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
                                    swipe={swipe}
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
                        />
                }
                
                {!navButtonsAlwaysInvisible && showButton(true) &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.next}`} style={navButtonsWrapperProps.style}>
                        {NavButton !== undefined ?
                            NavButton({onClick: this.next, className: buttonCssClassValue, style: navButtonsProps.style, next: true, prev: false})
                            :
                            <IconButton className={`${buttonCssClassValue}`} onClick={this.next} aria-label="Next" style={navButtonsProps.style}>
                                {NextIcon}
                            </IconButton>
                        }
                    </div>
                }

                {!navButtonsAlwaysInvisible && showButton(false) &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.prev}`} style={navButtonsWrapperProps.style}>
                        {NavButton !== undefined ?
                            NavButton({onClick: this.prev, className: buttonCssClassValue, style: navButtonsProps.style, next: false, prev: true})
                            :
                            <IconButton className={`${buttonCssClassValue}`} onClick={this.prev} aria-label="Previous" style={navButtonsProps.style}>
                                {PrevIcon}
                            </IconButton>
                        }
                    </div>
                }
                
                {
                    indicators ? 
                    <Indicators
                        classes={classes}
                        length={children.length}
                        active={this.state.active}
                        press={this.setActive}
                        indicatorContainerProps={indicatorContainerProps}
                        indicatorIconButtonProps={indicatorIconButtonProps}
                        activeIndicatorIconButtonProps={activeIndicatorIconButtonProps}
                        IndicatorIcon={IndicatorIcon}
                    /> : null
                }
            </div>
        )
    }
}

function CarouselItem(props)
{
    let swipeHandlers = useSwipeable({
        onSwipedLeft: () => props.next(),
        onSwipedRight: () => props.prev()
    })

    swipeHandlers = props.swipe ? swipeHandlers : {};

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
    const IndicatorIcon = props.IndicatorIcon !== undefined ? props.IndicatorIcon :
        <FiberManualRecordIcon 
            size='small'
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

export default withStyles(styles)(Carousel);
