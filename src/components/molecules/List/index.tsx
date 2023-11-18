import React from "react";
import styled from "styled-components";


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

interface ListProps {
  label?: string;
  filteredList: Itinerary[];
}

const formatDate = (dt: Date) => {
  const d = new Date(dt.year, dt.month, dt.dayOfMonth, dt.hourOfDay, dt.minute, dt.second).toDateString();
  return d;
}

const StyledAirlineDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .label-section {
    text-transform: uppercase;
    color: rgb(76, 76, 76);
  }

  .time-section {
    font-size: 20px;
    font-weight: 500;
    color: rgb(76, 76, 76);
    padding: 12px 0;
  }

  .location-section {
    color: rgb(144, 144, 144);
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    padding-bottom: 12px;
  }
`;

const List: React.FC<ListProps> = ({ label = "Airlines", filteredList }) => {
  return (
    <ul data-testid="flight-detail-list">
      {filteredList.map((list, index) => (
        <li key={index} className="m-6 shadow-md rounded-md">
          <section className="text-sm leading-6 p-6">
            <label className="uppercase text-gray-500">{label}</label>
            <span className="text-gray-500">: {list.carrier}</span>
          </section>

          <section className="flex justify-between">
            <div className="w-1/2 text-left">
            
              <StyledAirlineDetailsSection data-testid="flight-details" >
                <span className="label-section">Departure</span>
                <span className="time-section">{formatDate(list.departureDate)}</span>
                <span className="location-section">{list.departureLocation}</span>
            </StyledAirlineDetailsSection>
            </div>
            <div className="w-1/2 text-right">
            
               <StyledAirlineDetailsSection data-testid="flight-details" >
                <span className="label-section">Arrival</span>
                <span className="time-section">{formatDate(list.arrivalDate)}</span>
                <span className="location-section">{list.arrivalLocation}</span>
            </StyledAirlineDetailsSection>
            </div>
          </section>

          <section className="text-lg leading-6 text-right bg-gray-200 p-6">
            <label className="block">{list.price}</label>
            <span className="block text-sm leading-6 text-gray-500 font-normal">per passenger</span>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default List;
