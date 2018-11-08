import React ,{Component}from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Speaker from './Speaker'

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('Speaker renders wihout error', () => {
shallow(<Speaker />) 
}); 
