import React, { ForwardedRef } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  Options,
  PropsValue,
  SingleValue,
  StylesConfig,
} from "react-select";
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
  ({ defaultValue, onChange, options }, ref) => {
    return (
      <div data-testid="location-select">
        <Select
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          styles={colourStyles}
          classNamePrefix="od"
        />
      </div>
    );
  }
);

ODSelect.displayName = "ODSelect";
