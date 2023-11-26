import React from "react";
import { ListProps } from "./List.types";
import { ItineraryDate } from "../../organisms/SearchResults/SearchResults.types";

const formatDate = (dt: ItineraryDate) => {
  const d = new Date(
    dt.year,
    dt.month,
    dt.dayOfMonth,
    dt.hourOfDay,
    dt.minute,
    dt.second,
  ).toDateString();
  return d;
};

/**
 * `FlightDetail` is a component that renders flight details including label, location, and date.
 *
 * @param {object} props - The props that define the `FlightDetail` component.
 * @param {string} props.label - The label of the flight detail.
 * @param {string} props.location - The location of the flight detail.
 * @param {ItineraryDate} props.date - The date of the flight detail.
 * @param {string} props.testId - The testId of the flight detail.
 * @param {string} [props.className] - The optional className of the flight detail.
 */
const FlightDetail: React.FC<{
  label: string;
  location: string;
  date: ItineraryDate;
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

/**
 * `ListItem` is a component that renders a list item with flight details.
 *
 * @param {object} props - The props that define the `ListItem` component.
 * @param {any} props.list - The list of flight details.
 * @param {string} props.label - The label of the list item.
 */
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

/**
 * `List` is a component that renders a list of flight details.
 *
 * @param {object} props - The props that define the `List` component.
 * @param {string} [props.label = "Airlines"] - The label of the list.
 * @param {any[]} props.filteredList - The filtered list of flight details.
 */
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
