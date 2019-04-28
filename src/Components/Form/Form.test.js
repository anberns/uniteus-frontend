import React from 'react';
import Form from './Form';
import TextInput from '../TextInput/TextInput'
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form />);
    /*
    wrapper.setProps({
      inputClass: 'testClass',
      type: 'text',
      inputId: 'inputId',
      inputName: 'inputName',
      inputValue: 'inputValue',
      onchange: testFn,
      placeholder: 'placeholder',
      valClass: 'valClass',
      valId: 'valId'
    })
    */
  })
  it('renders a field for a first name', () => {
    expect(wrapper.containsMatchingElement(<TextInput inputId="fname" type="text"/>)).toEqual(true);
  }); 
  it('renders a field for a last name', () => {
    expect(wrapper.containsMatchingElement(<TextInput inputId="lname" type="text"/>)).toEqual(true);
  });
  it('renders a field for an email address', () => {
    expect(wrapper.containsMatchingElement(<TextInput type="email"/>)).toEqual(true);
  });
  it('renders a select field for service type', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });
  it('renders a textarea for a description', () => {
    expect(wrapper.containsMatchingElement(<TextInput type="textarea"/>)).toEqual(true);
  });
  it('renders a checkbox for terms acknowledgement', () => {
    expect(wrapper.containsMatchingElement(<input type="checkbox"/>)).toEqual(true);
  });
})