import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';
import CheckBox from '../components/checkbox';

jest.useFakeTimers();

describe('<CheckBox />', () => {
  it('is empty', async () => {
    const newBox = renderer.create(<CheckBox />);
    await act(async () => {
      expect(newBox.checked).toBe(false);
    })
    
    // this doesn't work, need to work out what we can actually test here
    // state? something else? is it empty or what?
  });
});
