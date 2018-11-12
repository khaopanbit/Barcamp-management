import React ,{Component}from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Home from './Home.js'
import Login from './Login.js'

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('Home renders wihout error', () => {
shallow(<Home />) 
}); 

test('Login renders wihout error', () => {
    shallow(<Login />) 
    }); 
