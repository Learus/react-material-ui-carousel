import React from 'react';
import {
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Slider,
    Typography,
} from '@material-ui/core';

export interface SettingsT {
    autoPlay: boolean,
    animation: "fade" | "slide",
    indicators: boolean,
    duration: number,
    navButtonsAlwaysVisible: boolean,
    navButtonsAlwaysInvisible: boolean,
    cycleNavigation: boolean,
    [key: string]: any
}

interface SettingsProps
{
    settings: SettingsT,
    setSettings: Function
}

// TODO Styling


const Settings = ({settings, setSettings}: SettingsProps) => {

    /** Default function for Checkboxes */
    const toggler = (event: any) => {
        setSettings({
            ...settings,
            [event.target.value]: !settings[event.target.value]
        })
    }

    /** Default function for Radio Groups */
    const radio = (event: any) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        })
    }

    /** Default function for Sliders */
    const slider = (event: any, value: any) => {
        console.log(event);
        console.log(value);
        setSettings({
            ...settings,
            [event.target.name]: value
        })
    }

    return (
        <>
            <FormLabel component="legend">Options</FormLabel>
            <FormControlLabel
                control={
                    <Checkbox onChange={toggler} checked={settings.autoPlay} value="autoPlay"
                        color="primary" />
                }
                label="Auto-play"
            />
            <FormControlLabel
                control={
                    <Checkbox onChange={toggler} checked={settings.indicators} value="indicators"
                        color="primary" />
                }
                label="Indicators"
            />
            <FormControlLabel
                control={
                    <Checkbox onChange={toggler} checked={settings.navButtonsAlwaysVisible} value="navButtonsAlwaysVisible" color="primary" />
                }
                label="NavButtonsAlwaysVisible"
            />

            <FormControlLabel
                control={
                    <Checkbox onChange={toggler} checked={settings.navButtonsAlwaysInvisible} value="navButtonsAlwaysInvisible" color="primary" />
                }
                label="NavButtonsAlwaysInvisible"
            />
            <FormControlLabel
                control={
                    <Checkbox onChange={toggler} checked={settings.cycleNavigation} value="cycleNavigation" color="primary" />
                }
                label="CycleNavigation"
            />

            <FormControlLabel
                control={
                    <div style={{width: 300}}>
                        <Typography>
                            Animation Type
                        </Typography>
                        <br/>
                        <RadioGroup name="animation" value={settings.animation} onChange={radio} row
                            style={{ marginLeft: "10px" }}>
                            <FormControlLabel value="fade" control={<Radio color="primary" />} label="Fade" />
                            <FormControlLabel value="slide" control={<Radio color="primary" />} label="Slide" />
                        </RadioGroup>
                    </div>
                }
                label=""
            />

            <FormControlLabel
                control={
                    <div style={{ width: 300 }}>
                        <Typography>
                            Animation Duration in ms
                        </Typography>
                        <Slider
                            defaultValue={500}
                            getAriaValueText={() => `${settings.duration}ms`}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={100}
                            marks
                            min={100}
                            max={3000}
                            onChangeCommitted={(e: any, v: any) => {
                                e.target.name = 'duration';
                                slider(e, v);
                            }}
                        />
                    </div>
                }
                label=""
            />
        </>
    )
}

export default Settings;