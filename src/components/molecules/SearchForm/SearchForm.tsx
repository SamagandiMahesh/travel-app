import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SearchFormProps } from "./SearchForm.types";
import { StyledButton, StyledForm } from "./SearchForm.styles";
import { ODDatePicker } from "../../atoms/Datepicker/Datepicker";
import { LocationSelect } from "../LocationSelect/LocationSelect";

/**
 * `SearchForm` is a component that renders a form for searching flights.
 * It includes fields for departure location, arrival location, and departure date.
 * It uses `react-hook-form` for form handling and `next/router` for routing.
 *
 * @example
 * ```tsx
 * <SearchForm />
 * ```
 */
export const SearchForm: React.FC<SearchFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departureLocation: "",
      arrivalLocation: "",
      selectedDate: null,
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalLocation, setArrivalLocation] = useState<string>("");

  const router = useRouter();

  /**
   * Handles the form submission.
   * It constructs the query parameters and navigates to the results page.
   */
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

    router.push({
      pathname: "/results",
      query: decodeURIComponent(queryParams.toString()),
    });
  }, [departureLocation, arrivalLocation, selectedDate, router]);

  return (
    <StyledForm className="container-fluid">
      <form
        onSubmit={handleSubmit(onFlightSearch)}
        data-testid="flight-search-form"
        className="row"
        role="form"
      >
        <div className="my-2 p-xs-0 ps-lg-0 col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <label htmlFor="departureLocation">Departure location</label>
          <LocationSelect
            control={control}
            name="departureLocation"
            setValue={setDepartureLocation}
          />
        </div>
        <div className="my-2 p-xs-0 ps-lg-0 col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <label htmlFor="arrivalLocation">Arrival location</label>
          <LocationSelect
            control={control}
            name="arrivalLocation"
            setValue={setArrivalLocation}
          />
        </div>
        <div className="my-2 p-xs-0  ps-lg-0  col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <label htmlFor="selectedDate">Departure date</label>
          <Controller
            name="selectedDate"
            control={control}
            render={({ field }) => (
              <ODDatePicker
                selectedDate={field.value}
                dateChangeHandler={(date: Date) => {
                  field.onChange(date);
                  setSelectedDate(date);
                }}
              />
            )}
          />
        </div>
        <div className="my-2 p-0 col-lg-3 col-md-6 col-sm-6 col-xs-12 d-flex align-items-end">
          <StyledButton type="submit" data-testid="search-button">
            Search
          </StyledButton>
        </div>
      </form>
    </StyledForm>
  );
};
