import React from 'react';
import Example from './Example'
import SecondExample from './SecondExample'
import '../style/App.scss';
import { Typography } from '@material-ui/core';

const App = () => (
    <div className="root">
        
        <h1>
            React Material UI Carousel Demo
        </h1>

        <div className="description">
            <div>
                <h3>Description</h3>
                <p>
                    A Generic, extendible Carousel UI component for React using Material UI.<br/>
                    It switches between given children using a smooth animation.<br/>
                    Provides next and previous buttons. Also provides interactible bullet indicators.
                </p>
            </div>
            <div>
                <h3>Links</h3>
                <p>
                    <a href="https://github.com/Learus/react-material-ui-carousel.git" target="_blank" rel='noreferrer'>
                        GitHub Repo
                    </a>
                </p>
                <p>
                    <a href="https://www.npmjs.com/package/react-material-ui-carousel" target="_blank" rel='noreferrer'>
                        NPM Package
                    </a>
                </p>
                <p>
                    <a href="https://github.com/Learus/react-material-ui-carousel/blob/master/CHANGELOG.md" target="_blank" rel='noreferrer'>
                        Changelog
                    </a>
                </p>
                <p>
                    <a href="http://learus.github.io" target="_blank" rel='noreferrer'>Learus</a>
                </p>
            </div>
        </div>
        

        <Example />
        <SecondExample />
    </div>
);

export default App;
