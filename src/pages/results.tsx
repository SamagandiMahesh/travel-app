import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { List } from "@/components/molecules/List/List";
import { Header } from "@/components/atoms/Header/Header";
interface Date {
  year: number;
  month: number;
  dayOfMonth: number;
  hourOfDay: number;
  minute: number;
  second: number;
}

interface Itinerary {
  carrier: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: Date;
  arrivalDate: Date;
  price: number;
}

const Results: React.FC = () => {
  const router = useRouter();
  const { toLoc, fromLoc, date } = router.query;
  const [filteredList, setFilteredList] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dataFetch();
  }, [toLoc, fromLoc, date]);

  const formatDate = (date: Date) => {
    return new Date(date.year, date.month, date.dayOfMonth).toLocaleDateString();
  }

  const dataFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4200/itineraries");
      const masterData: Itinerary[] = await response.json();
      if(toLoc && fromLoc) {
        setFilteredList(getItineraryData(masterData));
      } else {
        setFilteredList(masterData);
      }
    } catch(e) {
      console.error("Failed to fetch itineraries", e);
      setFilteredList([]);
    } finally {
      setLoading(false);
    }
  };

  const getItineraryData = (data: Itinerary[]) => {
    return data.filter((ele) => {
      if (ele.departureLocation === fromLoc && ele.arrivalLocation === toLoc) {
        if(!date) {
          return ele;
        } else {
          const availableDate = formatDate(ele.departureDate);
          const selectedDate = new Date(date as string).toLocaleDateString();
          return selectedDate === availableDate;
        }
      }
      return false;
    }).sort((a,b) => a.price -  b.price);
  };

  return (
    <React.Fragment>
      <Header />
      <label>Results Page</label>
      {!loading && (filteredList.length > 0 ? <List filteredList={filteredList} /> : <label>No Results to display</label>)}
    </React.Fragment>
  );
};

export default Results;
