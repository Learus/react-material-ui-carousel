import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../style/ThirdExample.scss";
import Carousel from "react-material-ui-carousel";

export default function Test3()
{
    const [height1, setHeight1] = useState(300);
    const [height2, setHeight2] = useState(200);
    const [height3, setHeight3] = useState(400);

    const heights = [height1, height2, height3];

    return (
        <div className="Example3" style={{ marginTop: "50px", color: "#494949" }}>
            <Typography variant='h4'>Example: Dynamic height</Typography>
            <br />
            <Carousel animation="fade" navButtonsAlwaysVisible autoPlay={false}>
                {
                    heights.map((item, i) => (
                        <Paper key={`test3-item-${i}`} elevation={10} style={{ height: item }} className="HeightItem">
                            <h1>{i + 1}. This item is <span style={{ color: 'cyan' }}>{item}px</span> high!</h1>
                        </Paper>
                    ))
                }
            </Carousel>

            <br />
            <TextField variant='outlined' value={height1} label='Height 1' onChange={(e) => setHeight1(+e.target.value)} />
            <TextField variant='outlined' value={height2} label='Height 2' onChange={(e) => setHeight2(+e.target.value)} />
            <TextField variant='outlined' value={height3} label='Height 3' onChange={(e) => setHeight3(+e.target.value)} />

            <br />
            <Typography style={{ marginTop: 20 }}>
                Note: The carousel doesn't change height as the input values change, but only when the active child changes.
            </Typography>
        </div>
        // </div>
    );
}
