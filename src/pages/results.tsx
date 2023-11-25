import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/router';

import { List } from "@/components/molecules/List/List";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import useFetchData from "@/hooks/useFetch";

type Date =  {
  year: number;
  month: number;
  dayOfMonth: number;
  hourOfDay: number;
  minute: number;
  second: number;
}

type Itinerary  = {
  carrier: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: Date;
  arrivalDate: Date;
  price: number;
}

const Results: React.FC = () => {
  const router = useRouter();
  const { arrival, departure, date } = router.query;

  const [filteredList, setFilteredList] = useState<Itinerary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useFetchData<Itinerary>(
    "http://localhost:4200/itineraries",
  );

  const formatDate = useCallback((date: Date) => {
    return new Date(date.year, date.month - 1, date.dayOfMonth).toLocaleDateString();
  }, []);

  const isDateMatch = useCallback((eleDate: Date, selectedDate: string) => {
    if (!selectedDate) {
      return true;
    }
    const availableDate = formatDate(eleDate);
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString();
    return formattedSelectedDate === availableDate;
  }, [formatDate]);

  const getItineraryData = useCallback((data: Itinerary[]) => {
    return data.filter((ele) => {
      const isDepartureMatch = departure ? ele.departureLocation === departure : true;
      const isArrivalMatch = arrival ? ele.arrivalLocation === arrival : true;
      const isDateMatched = isDateMatch(ele.departureDate, date as string);

      return isDepartureMatch && isArrivalMatch && isDateMatched;
    }).sort((a, b) => a.price - b.price);
  }, [arrival, departure, date, isDateMatch]);

  useEffect(() => {
    if (data) {
      setFilteredList(getItineraryData(data));
    }
  }, [data, getItineraryData]);

  const PER_PAGE = 5;
  const totalPages = Math.ceil(filteredList.length / PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = filteredList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <React.Fragment>
      <h2 className="display-6 my-4">Results Page</h2>
      {!loading && (filteredList.length > 0 ? (
        <>
          <List filteredList={currentData} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="card">
          <div className="card-body text-info">
            <label>No Results to display</label>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Results;
