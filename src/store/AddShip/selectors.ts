import { RootState } from "../store";

export const selectDeliveryDate = (state: RootState) =>
  state.addShip.deliveryDate;
export const selectCities = (state: RootState) => state.addShip.cities;
export const selectQuantity = (state: RootState) => state.addShip.quantity;
export const selectDeliveryType = (state: RootState) =>
  state.addShip.deliveryType;
export const selectWarehouse = (state: RootState) => state.addShip.warehouse;
export const selectStatus = (state: RootState) => state.addShip.status;
export const selectNumber = (state: RootState) => state.addShip.number;
