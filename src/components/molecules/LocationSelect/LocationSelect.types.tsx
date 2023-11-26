import { Control } from "react-hook-form";
import { FieldName, FormValues } from "../SearchForm/SearchForm.types";

export type LocationSelectProps = {
  control: Control<FormValues>;
  name: FieldName;
  setValue: (value: string) => void;
};
