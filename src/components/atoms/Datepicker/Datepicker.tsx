import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomInputProps, ODDatePickerProps } from "./Datepicker.types";
import { StyledDatePicker, StyledInput } from "./Datepicker.styles";

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
