import React from 'react';
import TextInput from './TextInput';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('TextInput', () => {
  let wrapper;
  let testFn = () => {};
  beforeEach(() => {
    wrapper = shallow(<TextInput />);
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
  })
  it('renders one input element', () => {
    expect(wrapper.containsMatchingElement(<input />)).toEqual(true);
  });
  it('renders input with correct attributes', () => {
    expect(wrapper.containsMatchingElement(
      <input 
        className="testClass"
        id="inputId"
        name="inputName"
        value="inputValue"
        placeholder="placeholder"
        onChange={testFn}
      />)).toEqual(true);
  });
  it('renders input with correct type', () => {
    expect(wrapper.containsMatchingElement(<input type="text"/>)).toEqual(true);
  });
  it('renders validation div with correct attributes', () => {
    expect(wrapper.containsMatchingElement(<div id="valId" className="valClass">required</div>)).toEqual(true);
  });
})
