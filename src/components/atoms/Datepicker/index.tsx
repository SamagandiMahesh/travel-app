import React, { ForwardedRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ODDatePickerProps {
    selectedDate: Date;
    dateChangeHandler: (date: Date) => void;
  }
  
  const ODDatePicker = React.forwardRef<HTMLInputElement, ODDatePickerProps>(
    ({ selectedDate, dateChangeHandler }, ref) => {
      return (
        <DatePicker
          selected={selectedDate}
          onChange={dateChangeHandler}
          data-testid="date-picker"
          ref={ref}
        />
      );
    }
  );
  
  ODDatePicker.displayName = 'ODDatePicker';
  
  export default ODDatePicker;
