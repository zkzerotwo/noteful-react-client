import React from 'react';
import { shallow } from 'enzyme'
import  Enzyme  from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NoteListSide from './NoteListSide'

Enzyme.configure({ adapter: new Adapter() });
describe(`NoteListSide component`, () => {
    const props = {
        folder: {
            "name": "Important"
        }
    }

    it('renders a .NoteListSide by default', () => {
        const wrapper = shallow(<NoteListSide />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders a h3 with folder name when in props', () => {
        const h3 = shallow(<NoteListSide {...props} />)
            .find('.NoteListSide__folder-name')
        expect(toJson(h3)).toMatchSnapshot()
    })
})