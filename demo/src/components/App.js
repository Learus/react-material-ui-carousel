import React from 'react';
import Example from './Example'
import SecondExample from './SecondExample'
import { StyledEngineProvider } from '@mui/material/styles';

const App = () => (
    <StyledEngineProvider injectFirst>
        <div style={{ padding: "40px 100px", backgroundColor: "#ebebeb" }}>
            <h1 style={{ color: "#494949" }}>React Material UI Carousel Demo</h1>
            <p style={{ marginBottom: "30px" }}>
                by <a href="http://learus.github.io" style={{ textDecoration: "none", color: "cornflowerblue" }}>Learus</a><br />
                <a href="https://github.com/Learus/react-material-ui-carousel.git" style={{ textDecoration: "none", color: "cornflowerblue" }}>GitHub Repo</a>
            </p>

            <Example />
            <SecondExample />
        </div>
    </StyledEngineProvider>

);

export default App;
