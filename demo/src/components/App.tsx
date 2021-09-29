import React from 'react';
import Example from './Example'
import SecondExample from './SecondExample'
import '../style/App.scss';
import { Button, ThemeProvider, Typography } from '@material-ui/core';
import DemoTheme from '../style/Theme';
import { GitHub, CloudDownload } from '@material-ui/icons';

const App = () => (
    <ThemeProvider theme={DemoTheme}>
        <div className="root">
            
            <Typography variant='h2'>
                <Typography component='span' variant='h2' color='primary'>React </Typography>
                Material UI Carousel
            </Typography>
            <Typography variant='subtitle1' align='left'>
                by &nbsp;
                <a href='https://github.com/learus' target='_blank' rel='noreferrer'>
                    Learus
                </a>
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
                    startIcon={<CloudDownload/>} 
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
                        <a href="https://github.com/Learus/react-material-ui-carousel/blob/master/README.md" target="_blank" rel='noreferrer'>
                            Documentation
                        </a>
                    </Typography>
                    <Typography>
                        <a href="https://github.com/Learus/react-material-ui-carousel/blob/master/CHANGELOG.md" target="_blank" rel='noreferrer'>
                            Changelog
                        </a>
                    </Typography>
                    <Typography>
                        <a href="https://www.buymeacoffee.com/Learus" target="_blank" rel='noreferrer'>Buy me a Coffee</a>
                    </Typography>
                </div>
            </div>

            <br/>

            <div className='installation'>
                <Typography style={{fontFamily: 'monospace', color: DemoTheme.palette.primary.main}}>
                    # Latest Release
                </Typography>
                <Typography style={{fontFamily: 'monospace'}}>
                    npm install react-material-ui-carousel
                </Typography>
                <br/>
                <Typography style={{fontFamily: 'monospace', color: DemoTheme.palette.primary.main}}>
                    # Material UI 5 support
                </Typography>
                <Typography style={{fontFamily: 'monospace'}}>
                    npm install react-material-ui-carousel@mui5
                </Typography>
            </div>

            <Example />
            <SecondExample />
        </div>
    </ThemeProvider>
);

export default App;
