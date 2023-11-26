import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import useFetchData from '../../../hooks/useFetch';
import { SearchResults } from './SearchResults';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../hooks/useFetch', () => jest.fn());

describe('SearchResults', () => {
  it('renders correctly', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { arrival: 'Test Arrival', departure: 'Test Departure', date: '2022-01-01' },
    });

    (useFetchData as jest.Mock).mockReturnValue({
      data: [
        {
          carrier: 'Test Airline',
          departureLocation: 'Test Departure',
          departureDate: {
            year: 2022,
            month: 1,
            dayOfMonth: 1,
            hourOfDay: 0,
            minute: 0,
            second: 0,
          },
          arrivalLocation: 'Test Arrival',
          arrivalDate: {
            year: 2022,
            month: 1,
            dayOfMonth: 1,
            hourOfDay: 0,
            minute: 0,
            second: 0,
          },
          price: 100,
        },
      ],
      loading: false,
      error: null,
    });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('Test Airline')).toBeInTheDocument();
      expect(screen.getByText('Test Departure')).toBeInTheDocument();
      expect(screen.getByText('Test Arrival')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });
});
