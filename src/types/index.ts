import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ActionCreatorWithPayload, SerializedError } from "@reduxjs/toolkit";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface DropDownState {
  id: number;
  text: string;
  selected: boolean;
}

export interface AddShipState {
  number: string;
  deliveryDate: string;
  cities: DropDownState[];
  quantity: string;
  deliveryType: DropDownState[];
  warehouse: DropDownState[];
  status: DropDownState[];
}

export interface EditShipState extends AddShipState {
  id: string;
}

export interface FooterPropsData {
  createPost?: (data: AddShipState) => void;
  updateShip?: (data: {
    id: string;
    data: Omit<EditShipState, "deliveryDate">;
  }) => void;
  target?: string;
  isSuccess: boolean;
  isLoading?: boolean;
  onClose: (arg: boolean) => void;
}

export interface FormPropsData {
  isFetchingInit: boolean;
  isLoadingInit: boolean;
  isErrorInit: boolean;
  errorInit: FetchBaseQueryError | SerializedError | undefined;
}

export type Actions = {
  setType: ActionCreatorWithPayload<number>;
  setCity: ActionCreatorWithPayload<number>;
  setWarehouse: ActionCreatorWithPayload<number>;
  setStatus: ActionCreatorWithPayload<number>;
  setQuantity: ActionCreatorWithPayload<string>;
};

// React Hook Forms
export type Inputs = {
  quantity: string;
  calendar: string;
};

export interface RHF {
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<Inputs>;
  setValue?: UseFormSetValue<Inputs>;
}
