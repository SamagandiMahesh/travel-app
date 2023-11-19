import React, { ForwardedRef } from 'react';
import Select, { ActionMeta, MultiValue, Options, PropsValue, SingleValue, StylesConfig } from 'react-select';

interface Option {
  readonly label: string;
  readonly value: string;
}
  
interface ODSelectProps {
  defaultValue?: SingleValue<Option>;
  onChange: (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
  options: Options<Option>;
}




const colourStyles: StylesConfig<{ label: string; value: string }> = {
  control: (styles) => ({ ...styles, backgroundColor: '#fff', height: '44px', borderColor: '#ccc' }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles }),
};

const ODSelect = React.forwardRef<Select, ODSelectProps>(
    ({ defaultValue, onChange, options }, ref) => {
      return (
        <Select
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          styles={colourStyles}
          data-testid="location-select"
        />
      );
    }
  );
  
  ODSelect.displayName = 'ODSelect';
  
  export default ODSelect;