import React from "react";
import Select, { StylesConfig } from "react-select";
import { ODSelectProps } from "./Select.types";

const colourStyles: StylesConfig<{ label: string; value: string }> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    height: "44px",
    borderColor: "#ccc",
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles }),
};

export const ODSelect = React.forwardRef<Select, ODSelectProps>(
  ({ defaultValue, onChange, options, name }, ref) => {
    return (
      <div data-testid="location-select">
        <Select
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          styles={colourStyles}
          classNamePrefix="od"
          name={name}
          inputId={name}
        />
      </div>
    );
  },
);

ODSelect.displayName = "ODSelect";
