import React, { useState } from 'react';
import Carousel from './TestCarousel';
import {
    Paper,
    Button,
} from '@material-ui/core'

import "../style/SecondExample.scss"
import Settings, { DefaultSettingsT, SettingsT } from './Settings';

const SecondExample = () => {
    const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);

    return (
        <div style={{ marginTop: "50px", color: "#494949" }}>
            <h2>Example: Learus Projects (random)</h2>

            <Carousel
                className="SecondExample"
                autoPlay={settings.autoPlay}
                animation={settings.animation}
                indicators={settings.indicators}
                duration={settings.duration}
                navButtonsAlwaysVisible={settings.navButtonsAlwaysVisible}
                navButtonsAlwaysInvisible={settings.navButtonsAlwaysInvisible}
                fullHeightHover={settings.fullHeightHover}
            >
                {
                    items.map((item, index) => {
                        return <Project item={item} key={index} />
                    })
                }
            </Carousel>
            <br/>
            <Settings settings={settings} setSettings={setSettings} />
        </div>
    )
}


type Item = {
    name: string,
    description: string,
    color: string
}

interface ProjectProps
{
    item: Item
}

function Project({item}: ProjectProps) {
    return (
        <Paper
            className="Project"
            style={{
                backgroundColor: item.color,
            }}
            elevation={10}
        >
            <h2>{item.name}</h2>
            <p>{item.description}</p>

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

export default SecondExample;