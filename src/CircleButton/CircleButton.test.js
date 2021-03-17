import React from 'react';
import { shallow } from 'enzyme'
import  Enzyme  from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CircleButton from './CircleButton'

Enzyme.configure({ adapter: new Adapter() });
describe(`CircleButton component`, () => {
    const props = {
      tag: 'a',
      className: 'test-class-name',
      children: <p>test children</p>,
      'data-other': 'test-other-prop'
    }
  
    it('renders a button.CircleButton by default', () => {
      const wrapper = shallow(<CircleButton />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  
    it('renders the circle button from props', () => {
      const wrapper = shallow(<CircleButton {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })