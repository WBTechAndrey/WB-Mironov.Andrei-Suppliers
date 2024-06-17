import { RootState } from "../store";

export const selectShippingData = (state: RootState) =>
  state.addModal.shippingData;
export const selectCities = (state: RootState) => state.addModal.cities;
export const selectQuantity = (state: RootState) => state.addModal.quantity;
export const selectType = (state: RootState) => state.addModal.type;
export const selectWarehouse = (state: RootState) => state.addModal.warehouse;
export const selectStatus = (state: RootState) => state.addModal.status;
