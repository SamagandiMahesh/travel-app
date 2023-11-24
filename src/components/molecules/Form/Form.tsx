import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Location, SearchFormProps } from "./Form.types";
import { StyledButton, StyledForm } from "./Form.styles";
import { ODSelect } from "@/components/atoms/Select/Select";
import { ODDatePicker } from "@/components/atoms/Datepicker/Datepicker";

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

  const createOption = (data: string[]) => {
    const tempArr: Location[] = data.map((element) => ({
      label: element,
      value: element,
    }));
    setLocation(tempArr);
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:4200/locations", {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const locData: string[] = await response.json();
      createOption(locData);
    } catch (e) {
      console.error("Failed to fetch location Data", e);
      setLocation([]);
      createOption([]);
    }
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFlightSearch = useCallback(() => {
    console.log(errors);
    const queryParams = new URLSearchParams([
      ["fromLoc", departureLocation],
      ["toLoc", arrivalLocation],
      ["date", selectedDate?.toDateString() || ""],
    ]);

    router.push(
      {
        pathname: "/results",
        query: {
          fromLoc: departureLocation,
          toLoc: arrivalLocation,
          date: selectedDate?.toDateString(),
        },
      },
      `/results?${decodeURIComponent(queryParams.toString())}`
    );
  }, [errors, departureLocation, arrivalLocation, selectedDate, router]);

  return (
    <StyledForm className="container-fluid">
      <form
        onSubmit={handleSubmit(onFlightSearch)}
        data-testid="flight-search-form"
        className="row"
      >
        <div className="col-lg-3 col-md-6 col-sm-12">
          <label>Departure location</label>
          <Controller
            name="departureLocation"
            control={control}
            render={({ field: { onChange } }) => (
              <ODSelect
                options={location}
                onChange={(option) => {
                  console.log(option);
                  onChange(option);
                  setDepartureLocation((option as Location).value);
                }}
              />
            )}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <label>Arrival location</label>
          <Controller
            name="arrivalLocation"
            control={control}
            render={({ field: { onChange } }) => (
              <ODSelect
                options={location}
                onChange={(option) => {
                  onChange(option);
                  setArrivalLocation((option as Location).value);
                }}
              />
            )}
          />
        </div>
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
