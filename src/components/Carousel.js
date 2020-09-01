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

class Carousel extends Component
{
    constructor(props)
    {
        super(props);

        const childrenLength = this.props.children ? this.props.children.length : 0;

        const strictIndexing = this.props.strictIndexing !== undefined ? props.strictIndexing : true;
        let startAt = this.props.startAt !== undefined ? props.startAt : 0;
        // if startAt is bigger than the children length, set it to be the last child (if strictIndexing)
        startAt = Array.isArray(this.props.children) ? (strictIndexing && startAt > childrenLength - 1 ? childrenLength - 1 : startAt) : 0

        this.state = {
            active: startAt,
            autoPlay: this.props.autoPlay !== undefined ? this.props.autoPlay : true,
            interval: this.props.interval !== undefined ? this.props.interval : 4000,
            displayed: startAt,
            childrenLength: childrenLength
        }

        this.timer = null;

        autoBind(this);
    }

    componentDidMount()
    {
        this.start();
    }

    componentWillUnmount()
    {
        this.stop();
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if (nextProps.autoPlay !== prevState.autoPlay || nextProps.interval !== prevState.interval)
        {
            return {
                autoPlay: nextProps.autoPlay !== undefined ? nextProps.autoPlay : true,
                interval: nextProps.interval !== undefined ? nextProps.interval : 4000
            }
        }

        else return null;
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevProps.autoPlay !== prevState.autoPlay || prevProps.interval !== prevState.interval)
        {
            this.reset();
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
        if (this.state.autoPlay)
        {
            this.timer = setInterval(this.next, this.state.interval);
        }
    }

    reset()
    {
        this.stop();

        if (this.state.autoPlay)
        {
            this.start();
        }
    }

    pressIndicator(index)
    {
        const active = this.state.active;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);
        const onChange = this.props.onChange !== undefined ? this.props.onChange : () => {};

        this.setState({
            active: index,
            displayed: this.state.active
        }, this.reset);

        setTimeout(() => {
            this.setState({
                displayed: index
            }, () => onChange(index, active))
        }, timeout);
    }

    next(event)
    {
        const active = this.state.active;
        const next = this.state.active + 1 > this.state.childrenLength - 1 ? 0 : this.state.active + 1;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);

        const onChange = this.props.onChange;
        /**
         * Callback to be called after setting the state. Will be:
         * * () => {} | if !props.next && !props.onChange
         * * props.onChange | if !props.next && props.onChange
         * * props.next | if props.next
         */
        const userNext = this.props.next !== undefined ? this.props.next : (onChange !== undefined ? onChange : () => {});


        this.setState({
            active: next,
            displayed: this.state.active
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: next
            }, () => userNext(next, active))
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const active = this.state.active;
        const prev = this.state.active - 1 < 0 ? this.state.childrenLength - 1 : this.state.active - 1;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);

        const onChange = this.props.onChange;
        /**
         * Callback to be called after setting the state. Will be:
         * * () => {} | if !props.prev && !props.onChange
         * * props.onChange | if !props.prev && props.onChange
         * * props.prev | if props.prev
         */
        const userPrev = this.props.prev !== undefined ? this.props.prev : (onChange !== undefined ? onChange : () => {});


        this.setState({
            active: prev,
            displayed: this.state.active
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: prev
            }, userPrev(prev, active))
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    render()
    {
        const indicators = this.props.indicators !== undefined ? this.props.indicators: true;
        const navButtonsAlwaysInvisible = this.props.navButtonsAlwaysInvisible !== undefined ? this.props.navButtonsAlwaysInvisible : false;
        const navButtonsAlwaysVisible = this.props.navButtonsAlwaysVisible !== undefined ? this.props.navButtonsAlwaysVisible : false;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);
        const fullHeightHover = this.props.fullHeightHover !== undefined ? this.props.fullHeightHover : true;

        const classes = this.props.classes;
        
        const buttonCssClassValue = `${classes.button} ${navButtonsAlwaysVisible? classes.buttonVisible: classes.buttonHidden } ${fullHeightHover ? classes.fullHeightHoverButton : ""}`;
        const buttonWrapperCssClassValue = `${classes.buttonWrapper} ${fullHeightHover ? classes.fullHeightHoverWrapper : ""}`;

        return (
            <div className={`${classes.root} ${this.props.className ? this.props.className : ""}`} onMouseEnter={this.stop} onMouseOut={this.reset}>
                {   
                    Array.isArray(this.props.children) ? 
                        this.props.children.map( (child, index) => {
                            return (
                                <CarouselItem 
                                    key={`carousel-item${index}`}
                                    display={index === this.state.displayed ? true : false}
                                    active={index === this.state.active ? true : false}
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
                            child={this.props.children}
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
                        length={this.state.childrenLength}
                        active={this.state.active}
                        press={this.pressIndicator}
                        indicatorProps={this.props.indicatorProps}
                        activeIndicatorProps={this.props.activeIndicatorProps}
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
                    <Slide direction="left" in={props.active} timeout={props.timeout}>
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

    return (
        <div className={`${classes.indicators}`}>
            {indicators}
        </div>
    )
}

export default withStyles(styles)(Carousel);
