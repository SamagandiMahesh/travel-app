import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Location, SearchFormProps } from "./Form.types";
import { StyledButton, StyledForm } from "./Form.styles";
import { ODSelect } from "@/components/atoms/Select/Select";
import { ODDatePicker } from "@/components/atoms/Datepicker/Datepicker";
import useFetchData from "@/hooks/useFetch";

type FieldName = "departureLocation" | "arrivalLocation" | "selectedDate";
  

export const Form: React.FC<SearchFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departureLocation: "",
      arrivalLocation: "",
      selectedDate: new Date(),
    },
  });

  const [location, setLocation] = useState<Location[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalLocation, setArrivalLocation] = useState<string>("");

  const router = useRouter();

  const createOption = useCallback((data: string[]) => {
    return data.map((element) => ({
      label: element,
      value: element,
    }));
  }, []);

  const { data: locData, loading, error } = useFetchData<string>(
    "http://localhost:4200/locations",
  );

  useEffect(() => {
    if (locData) {
      setLocation(createOption(locData));
    }
  }, [createOption, locData]);


  const onFlightSearch = useCallback(() => {
    const queryParams = new URLSearchParams();
    const query: { [key: string]: string } = {};

    if (departureLocation) {
      queryParams.append("departure", departureLocation);
      query.departure = departureLocation;
    }

    if (arrivalLocation) {
      queryParams.append("arrival", arrivalLocation);
      query.arrival = arrivalLocation;
    }

    if (departureLocation && arrivalLocation && selectedDate) {
      const dateString = selectedDate.toDateString();
      queryParams.append("date", dateString);
      query.date = dateString;
    }

    router.push(
      {
        pathname: "/results",
        query,
      },
      `/results?${decodeURIComponent(queryParams.toString())}`
    );
  }, [departureLocation, arrivalLocation, selectedDate, router]);
  
  const renderController = useCallback(
    (name: FieldName, label: string, Component: any, setValue: any) => (
      <div className="col-lg-3 col-md-6 col-sm-12">
        <label>{label}</label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
           
            <Component
              options={location}
              onChange={(option: Location) => {
                onChange(option);
                setValue((option as Location).value);
              }}
            />
          )}
        />
      </div>
    ),
    [control, location]
  );

  return (
    <StyledForm className="container-fluid">
      <form
        onSubmit={handleSubmit(onFlightSearch)}
        data-testid="flight-search-form"
        className="row"
      >
        {renderController("departureLocation", "Departure location", ODSelect, setDepartureLocation)}
        {renderController("arrivalLocation", "Arrival location", ODSelect, setArrivalLocation)}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <label>Departure date</label>
          <Controller
            name="selectedDate"
            control={control}
            render={({ field }) => (
              <ODDatePicker
                selectedDate={field.value}
                dateChangeHandler={(date) => {
                  field.onChange(date);
                  setSelectedDate(date);
                }}
              />
            )}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-end">
          <StyledButton type="submit">Search</StyledButton>
        </div>
      </form>
    </StyledForm>
  );
};

export default Form;
