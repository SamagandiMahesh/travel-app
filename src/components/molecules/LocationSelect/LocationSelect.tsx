import React, { useEffect, useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import { ODSelect } from "../../atoms/Select/Select";
import useFetchData from "../../../hooks/useFetch";
import { LocationSelectProps } from "./LocationSelect.types";
import { Location } from "../SearchForm/SearchForm.types";

export const LocationSelect: React.FC<LocationSelectProps> = ({
  control,
  name,
  setValue,
}) => {
  const [location, setLocation] = useState<Location[]>([]);

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
