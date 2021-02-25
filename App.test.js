/**
* @jest-environment jsdom
*/

import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';
import App from './App';
import Checkbox from './src/components/checkbox';
import { screen } from '@testing-library/dom';
import {fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';



jest.useFakeTimers();


describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = renderer.create(<App />).toJSON();
    await act(async () => { 
      expect(tree.children.length).toBe(1); 
    })
  });

  it('renders correctly', async () => {
    const tree = renderer.create(<App />).toJSON();
    await act(async () => {
      expect(tree).toMatchSnapshot();
    })
  });

  test('Signup flow', async () => {
  
    const app = render(<App />);

    userEvent.click(app.getByText("Sign up", { exact: false }))
    
    userEvent.type(app.getByPlaceholderText("Your Email"), 'testemail@gmail.com' )

    userEvent.type(app.getByPlaceholderText("Your Password"), 'password123' )

    await act(async () => {
      userEvent.click(app.getByText("Signup", { exact: false }))
      await act(async () => {
        expect(app).toMatchSnapshot();
      })
    })
    

    // userEvent.click(screen.getByText("Signup"))

   

    // // expect(screen).toContain("You have not saved any Achievements yet!");
    // expect(screen.getByText("You have not saved any Achievements yet!")).toBeTruthy(); 

  });
});

describe('<Checkbox />', () => {

  test('Checkbox is created with appropriate text', () => {
    const update = jest.fn();
    const checkbox = render(<Checkbox label="Work" saveSelected={update} />);
    expect(checkbox.queryByText("Work")).toBeTruthy(); 
  });
  
  test('Checkbox calls supplied function on click', () => {
    const update = jest.fn();
    const checkbox = render(<Checkbox label="Work" saveSelected={update} />);
    fireEvent.click(checkbox.getByText("Work"));
    expect(update).toHaveBeenCalled();
  });

});
