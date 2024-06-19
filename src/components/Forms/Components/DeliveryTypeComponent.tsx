import { ModalSelect } from "./ModalSelect";
import { styleNames } from "../../../features/DropDown/DropDown";
import React from "react";
import { DropDownState } from "../../../types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface DeliveryTypeComponentProps {
  type: DropDownState[];
  setType: ActionCreatorWithPayload<number>;
}

export function DeliveryTypeComponent({
  type,
  setType,
}: DeliveryTypeComponentProps) {
  return (
    <ModalSelect
      label="Тип поставки"
      data={type}
      action={setType}
      classNames={["modal", styleNames.twoRows]}
    />
  );
}
