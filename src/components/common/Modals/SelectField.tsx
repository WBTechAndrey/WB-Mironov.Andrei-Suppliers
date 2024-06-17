import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC, memo } from "react";
import { City } from "../../../store/AddShip/AddShipSlice";
import { Select } from "../../../features/Select/Select";
import { FormField } from "./FormField";

interface SelectFieldProps<T, A extends string> {
  label: string;
  data: T[];
  action: ActionCreatorWithPayload<number, A>;
  classNames: Array<string>;
}

const SelectFieldComponent: FC<SelectFieldProps<City, string>> = ({
  label,
  data,
  action,
  classNames,
}) => (
  <FormField label={label} className="container">
    <Select data={data} action={action} classNames={classNames} />
  </FormField>
);

export const SelectField = memo(SelectFieldComponent);
