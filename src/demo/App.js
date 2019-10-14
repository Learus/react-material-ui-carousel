import React from 'react';
import Example from '../lib/components/Example'
import SecondExample from '../lib/components/SecondExample'

const App = () => (
    <div style={{padding: "40px 100px", backgroundColor: "#ebebeb"}}>
        <h1 style={{color: "#494949"}}>React Material UI Carousel Demo</h1>
        <p style={{marginBottom: "30px"}}>
            by <a href="http://learus.github.io" style={{textDecoration: "none", color: "cornflowerblue"}}>Learus</a>
        </p>
        
        <Example/>
        {/* <SecondExample/> */}
    </div>
);

export default App;
