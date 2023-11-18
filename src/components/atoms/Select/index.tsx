// components/atoms/Select/Select.tsx

import React, { ForwardedRef } from 'react';
import Select, { StylesConfig } from 'react-select';

interface OptionType {
    label: string;
    value: string;
  }
  
  interface ODSelectProps {
    defaultValue?: OptionType;
    onChangeHandler: (option: OptionType | null) => void;
    options: OptionType[];
  }
  
const colourStyles: StylesConfig<{ label: string; value: string }> = {
  control: (styles) => ({ ...styles, backgroundColor: '#fff', height: '44px', borderColor: '#ccc' }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles }),
};

const ODSelect = React.forwardRef<Select<OptionType>, ODSelectProps>(
    ({ defaultValue, onChangeHandler, options }, ref) => {
      return (
        <Select
          defaultValue={defaultValue}
          onChange={onChangeHandler}
          options={options}
          styles={colourStyles}
          data-testid="location-select"
          ref={ref}
        />
      );
    }
  );
  
  ODSelect.displayName = 'ODSelect';
  
  export default ODSelect;