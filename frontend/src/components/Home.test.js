import React from 'react';
import ReactDOM from 'react-dom'
import Home from './Home.js'

test('renders wihout error', () => {
const div = document.createElement('div');
ReactDOM.render(<Home/>, div);
ReactDOM.unmountComponentAtNode(div); 
}); 