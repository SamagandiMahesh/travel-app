import ODDatePicker from '@/components/atoms/Datepicker';
import ODSelect from '@/components/atoms/Select';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Location, SearchFormProps } from './Form.types';
import { StyledButton, StyledForm } from './Form.styles';


const Form: React.FC<SearchFormProps> = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      departureLocation: '',
      arrivalLocation: '',
      selectedDate: new Date(),
    }
  });

  const [location, setLocation] = useState<Location[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [departureLocation, setDepartureLocation] = useState<string>('');
  const [arrivalLocation, setArrivalLocation] = useState<string>('');

  const router = useRouter();

 

  const createOption = (data: string[]) => {
    const tempArr: Location[] = data.map((element) => ({
      label: element,
      value: element.toLowerCase().replace(/\W/g, ''),
    }));
    setLocation(tempArr);
  };


  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:4200/locations", { mode: 'cors' });
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
  console.log(errors)
const queryParams = new URLSearchParams([
  ['fromLoc', departureLocation],
  ['toLoc', arrivalLocation],
  ['date', selectedDate?.toISOString() || ''],
]);

  router.push({
    pathname: "/results",
    query: {
      fromLoc:  departureLocation,
      toLoc: arrivalLocation,
      date: selectedDate?.toISOString(),
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
          render={({ field:{onChange} }) => (
            <ODSelect
              options={location}
              onChange={(option) => {
                console.log(option)
                onChange(option);
                setDepartureLocation((option as Location).value);
              }}
            
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
          render={({ field:{onChange} }) => (
            <ODSelect
              options={location}
              onChange={(option) => {
                onChange(option);
                setArrivalLocation((option as Location).value);
              }}
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