import React, { useEffect, useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import { ODSelect } from "../../atoms/Select/Select";
import useFetchData from "../../../hooks/useFetch";
import { LocationSelectProps } from "./LocationSelect.types";
import { Location } from "../SearchForm/SearchForm.types";

/**
 * `LocationSelect` is a component that renders a select dropdown for location selection.
 * It fetches the location data from an API and provides it to the `ODSelect` component.
 * 
 * @component
 * @example
 * ```tsx
 * <LocationSelect control={control} name="location" setValue={setValue} />
 * ```
 * 
 * @param {object} props - The props that define the `LocationSelect` component.
 * @param {React.BaseSyntheticEvent} props.control - The control object from `react-hook-form`.
 * @param {string} props.name - The name of the form control.
 * @param {(value: string) => void} props.setValue - The function to set the value of the form control.
 */
export const LocationSelect: React.FC<LocationSelectProps> = ({
  control,
  name,
  setValue,
}) => {
  const [location, setLocation] = useState<Location[]>([]);

  /**
   * Creates an array of options for the `ODSelect` component.
   * Each option is an object with `label` and `value` properties.
   * 
   * @param {string[]} data - The location data from the API.
   * @returns {Location[]} The array of options for the `ODSelect` component.
   */
  const createOption = useCallback((data: string[]) => {
    return data.map((element) => ({
      label: element,
      value: element,
    }));
  }, []);

  const {
    data: locData,
  } = useFetchData<string>("http://localhost:4200/locations");

  useEffect(() => {
    if (locData) {
      setLocation(createOption(locData));
    }
  }, [createOption, locData]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <ODSelect
          options={location}
          name={name}
          onChange={(option) => {
            onChange(option);
            setValue(option ? (option as Location).value : "");
          }}
        />
      )}
    />
  );
};

