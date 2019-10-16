import React from 'react';
import ReactDOM from 'react-dom';
import Example from '../components/Example';

it('Example renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Example />, div);
});
