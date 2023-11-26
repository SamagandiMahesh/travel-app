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

/**
 * `ODSelect` is a custom select component that uses the `Select` component from `react-select`.
 * It uses the `forwardRef` function to forward the ref to the `Select` component.
 * 
 * @component
 * @example
 * ```tsx
 * <ODSelect
 *   defaultValue={{ label: "Option 1", value: "1" }}
 *   onChange={(option) => console.log(option)}
 *   options={[
 *     { label: "Option 1", value: "1" },
 *     { label: "Option 2", value: "2" },
 *   ]}
 *   name="select"
 * />
 * ```
 * 
 * @param {object} props - The properties that define the `ODSelect` component.
 * @param {{ label: string; value: string }} props.defaultValue - The default option of the select.
 * @param {(option: { label: string; value: string }) => void} props.onChange - The function to call when an option is selected.
 * @param {{ label: string; value: string }[]} props.options - The options of the select.
 * @param {string} props.name - The name of the select.
 * @param {React.Ref<Select>} ref - The ref to forward to the `Select` component.
 */

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
