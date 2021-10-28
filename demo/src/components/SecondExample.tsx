import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper,
    Button,
    Typography,
} from '@mui/material'

import "../style/SecondExample.scss"
import Settings, { DefaultSettingsT, SettingsT } from './Settings';

const SecondExample = () => {
    const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);

    return (
        <div style={{ marginTop: "50px", color: "#494949" }}>
            <Typography variant='h4'>Example: Learus Projects (random)</Typography>
            <br/>
            <Carousel
                className="SecondExample"
                {...settings}
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
    color: string,
    href: string
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
            <Typography variant='h5'>{item.name}</Typography>
            <br/>
            <Typography>{item.description}</Typography>

            <Button className="CheckButton" component='a' href={item.href} target='_blank' rel='noreferrer'>
                Check it out!
            </Button>
        </Paper>
    )
}

const items: Item[] = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#64ACC8",
        href: 'https://github.com/Learus/Lear-Music-Reader'
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1",
        href: 'https://github.com/Learus/HashCode2019'
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78",
        href: 'https://play.google.com/store/apps/details?id=com.Brewery.Terrio'
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E",
        href: 'https://github.com/Learus/react-material-ui-carousel'
    }
]

export default SecondExample;