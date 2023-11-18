import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import List from "@/components/molecules/List";


interface Itinerary {
  departureLocation: string;
  arrivalLocation: string;
  departureDate: {
    year: number;
    month: number;
    dayOfMonth: number;
  };
  price: number;
}

interface ResultsProps {
  label?: string;
}

const Results: React.FC<ResultsProps> = ({ label = "Results" }) => {
  const router = useRouter();
  const { toLoc, fromLoc, date } = router.query;
  const [filteredList, setFilteredList] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    setLoading(true);
    try {
      let masterData: Itinerary[] =  await (await fetch("http://localhost:4200/itineraries")).json();
      if(toLoc && fromLoc) {
        masterData =  getItineraryData(masterData);
      } 
      masterData.sort((a, b) => a.price - b.price);
      setFilteredList(masterData);
    } catch(e) {
      console.error("Failed to fetch itineraries", e);
      setFilteredList([]);
    }
   
    setLoading(false)
  };

  const getItineraryData = (data: Itinerary[]) => {
    return data.filter((ele) => {
      if (ele.departureLocation === fromLoc && ele.arrivalLocation === toLoc) {
        if(!date) {
          return ele;
        } else {
          const  availableDate = new Date(ele.departureDate.year, ele.departureDate.month, ele.departureDate.dayOfMonth).toLocaleDateString();
          const selectedDate = new Date(date as string).toLocaleDateString()
          if  ( selectedDate === availableDate ) {
            return ele;
          }
        }
      }
    }).sort((a,b) => b.price -  a.price);
  };

  return (
    <React.Fragment>
      {/* {filteredList && (<><Title title={label} /> */}
      {filteredList.length > 0 && !loading && <List filteredList={filteredList} />}
      {/* {filteredList.length === 0 && !loading && <Title title="No Results to display"/>} */}
      {/* {loading && <Loader />} */}
      {/* </> )} */}
    </React.Fragment>
  );
};

export default Results;
