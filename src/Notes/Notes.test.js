import React from 'react';
import { shallow } from 'enzyme'
import  Enzyme  from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Notes from './Notes'

Enzyme.configure({ adapter: new Adapter() });
describe(`Note component`, () => {
    const props = {
      id: 'a',
      name: 'test-class-name',
      modified: new Date(2018, 12, 15),
    }
  
    it('renders a .Note by default', () => {
      const wrapper = shallow(<Notes />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  
    it('renders the Note given props', () => {
      const wrapper = shallow(<Notes {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
