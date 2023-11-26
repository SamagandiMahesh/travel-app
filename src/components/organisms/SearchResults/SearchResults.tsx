import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetch";
import { ITINERARY_URL, PAGINATION_LIMIT } from '../../../utils/constants';
import { List } from "../../molecules/List/List";
import { Pagination } from "../../molecules/Pagination/Pagination";
import { Itinerary, ItineraryDate } from "./SearchResults.types";

/**
 * `SearchResults` is a React component that fetches and displays a list of itineraries.
 * It supports pagination and displays 5 itineraries per page.
 * It uses the `useRouter` hook from `next/router` to get the query parameters and the `useFetchData` hook to fetch the itineraries.
 *
 * @component
 * @example
 * ```tsx
 * <SearchResults />
 * ```
 */
export const SearchResults: React.FC = () => {
  const router = useRouter();
  const { arrival, departure, date } = router.query;

  const [filteredList, setFilteredList] = useState<Itinerary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useFetchData<Itinerary>(
    ITINERARY_URL,
  );

  /**
   * Formats the given date as a locale string.
   *
   * @param {ItineraryDate} date - The date to format.
   * @returns {string} The formatted date.
   */
  const formatDate = useCallback((date: ItineraryDate) => {
    return new Date(
      date.year,
      date.month - 1,
      date.dayOfMonth,
    ).toLocaleDateString();
  }, []);

  /**
   * Checks if the given itinerary date matches the selected date.
   *
   * @param {ItineraryDate} eleDate - The itinerary date.
   * @param {string} selectedDate - The selected date.
   * @returns {boolean} `true` if the dates match, `false` otherwise.
   */
  const isDateMatch = useCallback(
    (eleDate: ItineraryDate, selectedDate: string) => {
      if (!selectedDate) {
        return true;
      }
      const availableDate = formatDate(eleDate);
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString();
      return formattedSelectedDate === availableDate;
    },
    [formatDate],
  );

  /**
   * Filters and sorts the given itineraries based on the query parameters.
   *
   * @param {Itinerary[]} data - The itineraries to filter and sort.
   * @returns {Itinerary[]} The filtered and sorted itineraries.
   */
  const getItineraryData = useCallback(
    (data: Itinerary[]) => {
      return data
        .filter((ele) => {
          const isDepartureMatch = departure
            ? ele.departureLocation === departure
            : true;
          const isArrivalMatch = arrival
            ? ele.arrivalLocation === arrival
            : true;
          const isDateMatched = isDateMatch(ele.departureDate, date as string);

          return isDepartureMatch && isArrivalMatch && isDateMatched;
        })
        .sort((a, b) => a.price - b.price);
    },
    [arrival, departure, date, isDateMatch],
  );

  useEffect(() => {
    if (data) {
      setFilteredList(getItineraryData(data));
    }
  }, [data, getItineraryData]);


  const totalPages = Math.ceil(filteredList.length / PAGINATION_LIMIT);

  /**
   * Handles the page change event of the `Pagination` component.
   *
   * @param {number} pageNumber - The page number that was clicked.
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = filteredList.slice(
    (currentPage - 1) * PAGINATION_LIMIT,
    currentPage * PAGINATION_LIMIT,
  );

  return (
    <React.Fragment>
      {!loading &&
        (filteredList.length > 0 ? (
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
