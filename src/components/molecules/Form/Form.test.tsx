import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';
import { ODSelect } from '../../atoms/Select/Select';
import { ODDatePicker } from '../../atoms/Datepicker/Datepicker';

jest.mock('../../atoms/Select/Select', () => ({
  ODSelect: jest.fn(),
}));

jest.mock('../../atoms/Datepicker/Datepicker', () => ({
  ODDatePicker: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }))

describe('Form', () => {
  it('renders without crashing', () => {
    render(<Form />);
  });

  it('submits the form with the correct values', async () => {
   

    ODSelect.mockImplementation(({ onChange }) => {
      return <select onChange={(e) => onChange({ value: e.target.value })} />;
    });

    ODDatePicker.mockImplementation(({ dateChangeHandler }) => {
      return <input type="date" onChange={(e) => dateChangeHandler(e.target.value)} />;
    });

    const { getByText, getByLabelText } = render(<Form />);

    const departureLocationSelect = getByLabelText('Departure location');
    const arrivalLocationSelect = getByLabelText('Arrival location');
    const departureDateInput = getByLabelText('Departure date');
    const searchButton = getByText('Search');

    fireEvent.change(departureLocationSelect, { target: { value: 'test departure' } });
    fireEvent.change(arrivalLocationSelect, { target: { value: 'test arrival' } });
    fireEvent.change(departureDateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith({
        pathname: '/results',
        query: 'departure=test departure&arrival=test arrival&date=2022-01-01',
      });
    });
  });
});
