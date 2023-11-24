import React, { ForwardedRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ODDatePickerProps } from './Datepicker.types';

  export const ODDatePicker = React.forwardRef<HTMLInputElement, ODDatePickerProps>(
    ({ selectedDate, dateChangeHandler }, ref) => {
      return (
        <DatePicker
          selected={selectedDate}
          onChange={dateChangeHandler}
          data-testid="date-picker"
        />
      );
    }
  );
  
  ODDatePicker.displayName = 'ODDatePicker';
  
