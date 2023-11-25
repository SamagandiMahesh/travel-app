import Select, { ActionMeta, MultiValue, Options, PropsValue, SingleValue, StylesConfig } from 'react-select';

export type Option = {
    readonly label: string;
    readonly value: string;
  }
    
  export type ODSelectProps = {
    defaultValue?: SingleValue<Option>;
    onChange: (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    options: Options<Option>;
  }
  