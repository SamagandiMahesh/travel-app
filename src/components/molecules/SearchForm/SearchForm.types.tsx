export type SearchFormProps = {};
export type FormValues = {
  departureLocation: string;
  arrivalLocation: string;
  selectedDate: null;
};

export type Location = {
  readonly label: string;
  readonly value: string;
};

export type FieldName =
  | "departureLocation"
  | "arrivalLocation"
  | "selectedDate";
