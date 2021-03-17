  
import React from 'react';
import { shallow } from 'enzyme'
import  Enzyme  from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddFolder from './AddFolder'


Enzyme.configure({ adapter: new Adapter() });

describe(`AddItemForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddFolder />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})