import React from 'react';
import Example from './Example'
import SecondExample from './SecondExample'
import '../style/App.scss';
import { Button, Icon, ThemeProvider, Typography } from '@material-ui/core';
import DemoTheme from '../style/Theme';
import { GitHub, FreeBreakfast } from '@material-ui/icons';
import NpmLogo from '../images/npm.svg';

const App = () => (
    <ThemeProvider theme={DemoTheme}>
        <div className="root">
            
            <Typography variant='h2'>
                {/* <span><img src={ReactLogo} alt='React Logo'/></span> */}
                <Typography component='span' variant='h2' color='primary'>React </Typography>
                Material UI Carousel
            </Typography>
            <br/>
            <div className="buttonContainer">
                <Button 
                    startIcon={<GitHub/>} 
                    variant='contained'
                    className='github'
                    component='a'
                    href="https://github.com/Learus/react-material-ui-carousel.git"
                    target="_blank"
                    rel='noreferrer'
                >
                    Github
                </Button>
                &nbsp;
                <Button 
                    // startIcon={<Icon><img src={NpmLogo}/></Icon>} 
                    variant='contained'
                    className='npm'
                    component='a'
                    href="https://www.npmjs.com/package/react-material-ui-carousel"
                    target="_blank"
                    rel='noreferrer'
                >
                    npm
                </Button>
            </div>

            <br/>
            <br/>
            <div className="description">
                <div>
                    <Typography variant='h4'>
                        {"<Carousel/>"}
                    </Typography>
                    <Typography>
                        A Generic, extendible Carousel UI component for React using Material UI.<br/>
                        It switches between given children using a smooth animation.<br/>
                        Provides next and previous buttons. Also provides interactible bullet indicators.
                    </Typography>
                </div>
                <div>
                    <Typography variant='h4'>Links</Typography>
                    <Typography>
                        <a href="https://github.com/Learus/react-material-ui-carousel.git" target="_blank" rel='noreferrer'>
                            GitHub Repo
                        </a>
                    </Typography>
                    <Typography>
                        <a href="https://www.npmjs.com/package/react-material-ui-carousel" target="_blank" rel='noreferrer'>
                            NPM Package
                        </a>
                    </Typography>
                    <Typography>
                        <a href="https://github.com/Learus/react-material-ui-carousel/blob/master/CHANGELOG.md" target="_blank" rel='noreferrer'>
                            Changelog
                        </a>
                    </Typography>
                    <Typography>
                        <a href="http://learus.github.io" target="_blank" rel='noreferrer'>Learus</a>
                    </Typography>
                </div>
            </div>

            <br/>
            {/* TODO copy code + MUI 5 support */}
            <div className='installation'>
                <Typography style={{fontFamily: 'monospace'}}>
                    npm install react-material-ui-carousel --save
                </Typography>
            </div>

            <Example />
            <SecondExample />
        </div>
    </ThemeProvider>
);

export default App;
