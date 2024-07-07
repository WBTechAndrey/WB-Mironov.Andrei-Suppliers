import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC, memo } from "react";
import { Select } from "features/Select";
import { DropDownState } from "types";
import { ModalField } from "./ModalField";
import { setActiveModalsId } from "store/OpenDropDownMenu/isOpenSlice";
import { selectActiveModalsId } from "store/OpenDropDownMenu/selectors";
import { useAppSelector } from "hooks/redux/redux";

interface SelectFieldProps<T, A extends string> {
  label: string;
  data: T[];
  action: ActionCreatorWithPayload<number, A>;
  classNames: Array<string>;
}

export const ModalSelect: FC<SelectFieldProps<DropDownState, string>> = memo(
  ({ label, data, action, classNames }) => {
    const activeModalsId = useAppSelector(selectActiveModalsId);

    return (
      <ModalField label={label} className="container">
        <Select
          data={data}
          action={action}
          classNames={classNames}
          label={label}
          actionClose={setActiveModalsId}
          activeId={activeModalsId}
        />
      </ModalField>
    );
  },
);
