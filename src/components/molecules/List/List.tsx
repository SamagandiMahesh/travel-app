import React from "react";
import { CustomDate, ListProps } from "./List.types";

const formatDate = (dt: CustomDate) => {
  const d = new Date(
    dt.year,
    dt.month,
    dt.dayOfMonth,
    dt.hourOfDay,
    dt.minute,
    dt.second
  ).toDateString();
  return d;
};

const FlightDetail: React.FC<{
  label: string;
  location: string;
  date: CustomDate;
  testId: string;
  className?: string;
}> = ({ label, location, date, testId, className }) => (
  <section data-testid={testId} className="my-2">
    <div className={`d-flex  align-items-center ${className}`}>
      <p className="text-muted small">{label}:&nbsp;</p>
      <p className="text-muted text-uppercase">{location}</p>
    </div>
    <p className="h5">{formatDate(date)}</p>
  </section>
);

const ListItem: React.FC<{ list: any; label: string }> = ({ list, label }) => (
  <li className="my-3 shadow rounded">
    <section className="p-3 d-flex align-items-center">
      <p className="text-secondary small m-0">{label}:&nbsp;</p>
      <p className="text-uppercase m-0"> {list.carrier}</p>
    </section>

    <hr className="m-0" />
    <section className="d-flex flex-column flex-sm-row justify-content-between p-3">
      <div className="text-start">
        <FlightDetail
          label="Departure"
          location={list.departureLocation}
          date={list.departureDate}
          testId="departure-details"
        />
      </div>
      <div className="text-sm-end">
        <FlightDetail
          label="Arrival"
          location={list.arrivalLocation}
          date={list.arrivalDate}
          testId="arrival-details"
          className="d-flex justify-content-sm-end"
        />
      </div>
    </section>

    <section className="lead text-end bg-light p-3">
      <label className="d-block">{list.price}</label>
      <small className="text-end text-muted fw-light small d-block">
        per passenger
      </small>
    </section>
  </li>
);

export const List: React.FC<ListProps> = ({
  label = "Airlines",
  filteredList,
}) => (
  <ul data-testid="flight-detail-list" className="list-unstyled">
    {filteredList.map((list, index) => (
      <ListItem key={index} list={list} label={label} />
    ))}
  </ul>
);
