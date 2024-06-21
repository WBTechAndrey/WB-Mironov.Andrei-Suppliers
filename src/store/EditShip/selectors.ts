import { RootState } from "../store";

export const selectEditDeliveryType = (state: RootState) =>
  state.editShip.deliveryType;

export const selectEditCities = (state: RootState) => state.editShip.cities;

export const selectEditStatus = (state: RootState) => state.editShip.status;

export const selectEditWarehouse = (state: RootState) =>
  state.editShip.warehouse;

export const selectEditQuantity = (state: RootState) => state.editShip.quantity;
