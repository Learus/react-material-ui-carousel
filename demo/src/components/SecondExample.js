import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {
    FormLabel,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Paper,
    Button,
    Slider,
    Typography
} from '@material-ui/core'

import "../style/SecondExample.scss"

function Project(props)
{
    return (
        <Paper 
            className="Project"
            style={{
                backgroundColor: props.item.color, 
            }}
            elevation={10}
        >
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

const items = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#64ACC8"
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1"
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78"
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E"
    }
]

export default class MyProjectsExample extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false
        }

        autoBind(this);
    }

    toggleAutoPlay()
    {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators()
    {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible()
    {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    toggleNavButtonsAlwaysInvisible()
    {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        })
    }

    changeAnimation(event)
    {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value)
    {
        this.setState({
            timeout: value
        })
    }

    render()
    {
        return (
            <div style={{marginTop: "50px", color: "#494949"}}>
                <h2>Example: Learus Projects (random)</h2>

                <Carousel 
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    
                >
                    {
                        items.map( (item, index) => {
                            return <Project item={item} key={index}/>
                        })
                    }
                </Carousel>


                <FormLabel component="legend">Options</FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleAutoPlay} checked={this.state.autoPlay} value="autoplay" color="primary"/>
                    }
                    label="Auto-play"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleIndicators} checked={this.state.indicators} value="indicators" color="primary"/>
                    }
                    label="Indicators"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleNavButtonsAlwaysVisible} checked={this.state.navButtonsAlwaysVisible} value="indicators" color="primary"/>
                    }
                    label="NavButtonsAlwaysVisible"
                />

                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleNavButtonsAlwaysInvisible} checked={this.state.navButtonsAlwaysInvisible} value="indicators" color="primary"/>
                    }
                    label="NavButtonsAlwaysInvisible"
                />

                
                <FormControlLabel
                    control={
                        <RadioGroup name="animation" value={this.state.animation} onChange={this.changeAnimation} row style={{marginLeft: "10px"}}>
                            <FormControlLabel value="fade" control={<Radio color="primary"/>} label="Fade"/>
                            <FormControlLabel value="slide" control={<Radio color="primary"/>} label="Slide"/>
                        </RadioGroup>
                    }
                />

                <FormControlLabel
                    control={
                        <div style={{width: 300}}>
                            <Typography id="discrete-slider" gutterBottom>
                                Animation Duration (Timeout) in ms
                            </Typography>
                            <Slider
                                defaultValue={500}
                                getAriaValueText={() => `${this.state.timeout}ms`}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={100}
                                marks
                                min={100}
                                max={2000}
                                onChange={this.changeTimeout}
                            />
                        </div>
                    }
                />
                
            </div>
        )
    }
}