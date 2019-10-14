import React, { Component } from 'react';
import {Fade, Slide, IconButton} from '@material-ui/core';
import autoBind from 'auto-bind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import '../style/Carousel.scss';

export default class Carousel extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: 0
        }

        this.timer = null;
        this.interval = this.props.interval !== undefined ? this.props.interval : 4000;
        this.autoPlay = this.props.autoPlay !== undefined ? this.props.autoPlay : true;
        this.indicators = this.props.indicators !== undefined ? this.props.indicators: true;
        this.animation = this.props.animation !== undefined ? this.props.animation: "fade"

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

    stop()
    {
        if (this.autoPlay)
        {
            if (this.timer)
                clearInterval(this.timer);
        }
    }

    start()
    {
        if (this.autoPlay)
        {
            this.timer = setInterval(this.next, this.interval);
        }
    }

    reset()
    {
        if (this.autoPlay)
        {
            this.stop();
            this.start();
        }
    }

    pressIndicator(index)
    {
        this.setState({
            active: index
        }, this.reset)
    }

    next(event)
    {
        const next = this.state.active + 1 > this.props.children.length - 1 ? 0 : this.state.active + 1;

        this.setState({
            active: next
        }, this.reset)

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const prev = this.state.active - 1 < 0 ? this.props.children.length - 1 : this.state.active - 1;

        this.setState({
            active: prev
        }, this.reset)

        if (event)
            event.stopPropagation();
    }

    render()
    {
        const indicators = this.props.indicators !== undefined ? this.props.indicators: true;
        const animation = this.props.animation !== undefined ? this.props.animation: "fade"

        return (
            <div className={`Carousel ${this.props.className ? this.props.className : ""}`} onMouseEnter={this.stop} onMouseOut={this.reset}>
                {   
                    Array.isArray(this.props.children) ? 
                        this.props.children.map( (child, index) => {
                            return (
                                <CarouselItem key={index} active={index === this.state.active ? true : false} child={child} animation={animation}/>
                            )
                        })
                        :
                        <CarouselItem key={0} active={true} child={this.props.children}/>
                }
                
                <div className="Next ButtonWrapper">
                    <IconButton className="Next Button mui--align-middle" onClick={this.next}>
                        <NavigateNextIcon/>
                    </IconButton>
                </div>

                <div className="Prev ButtonWrapper">
                    <IconButton className="Prev Button mui--align-middle" onClick={this.prev}>
                        <NavigateBeforeIcon/>
                    </IconButton>
                </div>
                
                {indicators ? <Indicators length={this.props.children.length} active={this.state.active} press={this.pressIndicator}/> : null}
            </div>
        )
    }
}

function CarouselItem(props)
{
    return (
        // props.active ? 
        // (
            <div className="CarouselItem" hidden={!props.active}>
                {props.animation === "slide" ?
                    <Slide direction="left" in={props.active} timeout={200}>
                        <div>
                            {props.child}
                        </div>
                    </Slide>
                    :
                    <Fade in={props.active} timeout={500}>
                        <div>
                            {props.child}
                        </div>
                    </Fade>
                }
            </div>
        // ) : null
    )
}

function Indicators(props)
{
    let indicators = [];
    for (let i = 0; i < props.length; i++)
    {
        const className = i === props.active ? "Active Indicator" : "Indicator";
        const item = <FiberManualRecordIcon key={i} size='small' className={className} onClick={() => {props.press(i)}}/>;

        indicators.push(item);
    }

    return (
        <div className="Indicators">
            {indicators}
        </div>
    )
}