// components/molecules/Form/Form.tsx

import ODDatePicker from '@/components/atoms/Datepicker';
import ODSelect from '@/components/atoms/Select';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface SearchFormProps {
}

interface Location {
  label: string;
  value: string;
}

const StyledButton = styled.button`
  font-family: rubik, sans-serif;
  background: #005dad;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  border-radius: 22px;
  height: 44px;
  padding-left: 22px;
  padding-right: 22px;
  border: none;

  &:hover {
    background: #5cb4ff;
  }
`;

const StyledForm = styled.div`

    label {
        display: flex;
        margin-bottom: 5px;
    }

`;


const Form: React.FC<SearchFormProps> = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      departureLocation: '',
      arrivalLocation: '',
      selectedDate: null
    }
  });

  const [location, setLocation] = useState<Location[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalLocation, setArrivalLocation] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    fetchLocations();
  }, []);

  const formatLocationData = (data: string[]) => {
    const tempArr: Location[] = data.map((element) => ({
      label: element,
      value: element,
    }));
    setLocation(tempArr);
  };


  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:4200/locations", { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const locData: Location[] = await response.json();
      formatLocationData(locData);
    } catch (e) {
      console.error("Failed to fetch location Data", e);
      setLocation([]);
      formatLocationData([]);
    }
  };

 const onFlightSearch = useCallback(() => {
  console.log(errors)
const queryParams = new URLSearchParams([
  ['fromLoc', departureLocation],
  ['toLoc', arrivalLocation],
  ['date', selectedDate?.toISOString() || ''],
]);

  router.push({
    pathname: "/results",
    query: {
      fromLoc: departureLocation,
      toLoc: arrivalLocation,
      date: selectedDate,
    },
  }, `/results?${queryParams.toString()}`);
}, [errors, departureLocation, arrivalLocation, selectedDate, router]);


  return (
    <form onSubmit={handleSubmit(onFlightSearch)} data-testid="flight-search-form">
    <StyledForm className="lg:container lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label>Departure location</label> 
        <Controller
          name="departureLocation"
          control={control}
          rules={{ required: 'Departure location is required' }}
          render={({ field }) => (
            <ODSelect
              options={location}
              onChangeHandler={(val) => {
                field.onChange(val.value);
                setDepartureLocation(val.value);
              }}
              value={field.value}
            />
          )}
        />
        {errors.departureLocation?.message && <p>{errors.departureLocation.message}</p>}
      </div>
      <div>
        <label>Arrival location</label> 
        <Controller
          name="arrivalLocation"
          control={control}
          rules={{ required: 'Arrival location is required' }}
          render={({ field }) => (
            <ODSelect
              options={location}
              onChangeHandler={(val) => {
                field.onChange(val.value);
                setArrivalLocation(val.value);
              }}
              value={field.value}
            />
          )}
        />
        {errors.arrivalLocation?.message && <p>{errors.arrivalLocation.message}</p>}
      </div>
      <div>
        <label>Departure date</label> 
        <Controller
          name="selectedDate"
          control={control}
          rules={{ required: 'Departure date is required' }}
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
        {errors.selectedDate?.message && <p>{errors.selectedDate.message}</p>}
      </div>
      <div className="flex items-end">
        <StyledButton type="submit">Search</StyledButton>
      </div>
    </StyledForm>
  </form>

  );
};

export default Form;