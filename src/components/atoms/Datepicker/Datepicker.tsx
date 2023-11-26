import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomInputProps, ODDatePickerProps } from "./Datepicker.types";
import { StyledDatePicker, StyledInput } from "./Datepicker.styles";

/**
 * `CustomInput` is a custom input component for the `DatePicker` component.
 * It uses the `forwardRef` function to forward the ref to the `StyledInput` component.
 * 
 * @param {object} props - The properties that define the `CustomInput` component.
 * @param {string} props.value - The current value of the input.
 * @param {() => void} props.onClick - The function to call when the input is clicked.
 * @param {React.Ref<HTMLInputElement>} ref - The ref to forward to the `StyledInput` component.
 */
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <StyledInput
      className="form-control"
      onClick={onClick}
      value={value}
      ref={ref}
      data-testid="datepicker-input"
    />
  ),
);

CustomInput.displayName = "CustomInput";

/**
 * `ODDatePicker` is a custom date picker component that uses the `DatePicker` component from `react-datepicker`.
 * It uses the `forwardRef` function to forward the ref to the `DatePicker` component.
 * 
 * @component
 * @example
 * ```tsx
 * <ODDatePicker selectedDate={new Date()} dateChangeHandler={(date) => console.log(date)} />
 * ```
 * 
 * @param {object} props - The properties that define the `ODDatePicker` component.
 * @param {Date} props.selectedDate - The currently selected date.
 * @param {(date: Date) => void} props.dateChangeHandler - The function to call when the date is changed.
 * @param {React.Ref<HTMLInputElement>} ref - The ref to forward to the `DatePicker` component.
 */
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
  },
);

ODDatePicker.displayName = "ODDatePicker";
