import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ODDatePickerProps } from './Datepicker.types';
import { StyledDatePicker, StyledInput } from './Datepicker.styles';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick }, ref) => (
  <StyledInput
    className="form-control"
    onClick={onClick}
    value={value}
    ref={ref}
  />
));

CustomInput.displayName = 'CustomInput';

export const ODDatePicker = forwardRef<HTMLInputElement, ODDatePickerProps>(
  ({ selectedDate, dateChangeHandler }, ref) => {
    return (
      <StyledDatePicker>
      <DatePicker
        selected={selectedDate}
        onChange={dateChangeHandler}
        data-testid="date-picker"
        customInput={<CustomInput />}
      />
      </StyledDatePicker>
    );
  }
);

ODDatePicker.displayName = 'ODDatePicker';
