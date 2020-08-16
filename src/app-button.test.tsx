/**
 * @jest-environment jsdom
 */
import React from "react";
import {AppButton} from "./app-button";
import { render } from '@testing-library/react'

describe('AppButton', () => {

    test('should render a button with input label', () => {
        const label = "label-text";
        let { getByText } = render(<AppButton label={label} onButtonClick={jest.fn()}/>);
        expect(getByText(label)).toBeInTheDocument();
    });

    test('should call input function on click', () => {
        const mockFunction = jest.fn();
        let { getByRole } = render(<AppButton  label={"test"} onButtonClick={mockFunction}/>);
        getByRole("button").click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
    });

});