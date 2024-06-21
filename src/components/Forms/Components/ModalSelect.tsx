import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC, memo } from "react";
import { Select } from "features/Select";
import { DropDownState } from "types";
import { ModalField } from "./ModalField";

interface SelectFieldProps<T, A extends string> {
  label: string;
  data: T[];
  action: ActionCreatorWithPayload<number, A>;
  classNames: Array<string>;
}

export const ModalSelect: FC<SelectFieldProps<DropDownState, string>> = memo(
  ({ label, data, action, classNames }) => (
    <ModalField label={label} className="container">
      <Select
        data={data}
        action={action}
        classNames={classNames}
        label={label}
      />
    </ModalField>
  ),
);
