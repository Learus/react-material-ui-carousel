import React, { Component } from 'react';
import {Fade, Slide, IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import autoBind from 'auto-bind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = {
    root: {
        position: "relative"
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

        this.state = {
            active: 0,
            autoPlay: this.props.autoPlay !== undefined ? this.props.autoPlay : true,
            interval: this.props.interval !== undefined ? this.props.interval : 4000,
            displayed: 0
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
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);

        this.setState({
            active: index,
            displayed: this.state.active
        }, this.reset);

        setTimeout(() => {
            this.setState({
                displayed: index
            })
        }, timeout);
    }

    next(event)
    {
        const next = this.state.active + 1 > this.props.children.length - 1 ? 0 : this.state.active + 1;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);

        this.setState({
            active: next,
            displayed: this.state.active
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: next
            })
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const prev = this.state.active - 1 < 0 ? this.props.children.length - 1 : this.state.active - 1;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade";
        const timeout = this.props.timeout !== undefined ? this.props.timeout : (animation === "fade" ? 500 : 200);

        this.setState({
            active: prev,
            displayed: this.state.active
        }, this.reset)

        setTimeout(() => {
            this.setState({
                displayed: prev
            })
        }, timeout);

        if (event)
            event.stopPropagation();
    }

    render()
    {
        const indicators = this.props.indicators !== undefined ? this.props.indicators: true;
        const navButtonsAlwaysVisible = this.props.navButtonsAlwaysVisible !== undefined ? this.props.navButtonsAlwaysVisible: false;
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
                        />
                }
                
                <div className={`${buttonWrapperCssClassValue} ${classes.next}`}>
                    <IconButton className={`${buttonCssClassValue} ${classes.next}`} onClick={this.next}>
                        <NavigateNextIcon/>
                    </IconButton>
                </div>

                <div className={`${buttonWrapperCssClassValue} ${classes.prev}`}>
                    <IconButton className={`${buttonCssClassValue}  ${classes.prev}`} onClick={this.prev}>
                        <NavigateBeforeIcon/>
                    </IconButton>
                </div>
                
                {indicators ? <Indicators classes={classes} length={this.props.children.length} active={this.state.active} press={this.pressIndicator}/> : null}
            </div>
        )
    }
}

function CarouselItem(props)
{
    return (
        props.display ? (
            <div className="CarouselItem" >
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
        const className = i === props.active ? `${classes.indicator} ${classes.active}`: `${classes.indicator}`;
        const item = <FiberManualRecordIcon key={i} size='small' className={className} onClick={() => {props.press(i)}}/>;

        indicators.push(item);
    }

    return (
        <div className={`${classes.indicators}`}>
            {indicators}
        </div>
    )
}

export default withStyles(styles)(Carousel);