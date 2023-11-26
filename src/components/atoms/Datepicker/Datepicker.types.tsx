export type ODDatePickerProps = {
  selectedDate: Date | null;
  dateChangeHandler: (date: Date) => void;
};

export type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};
