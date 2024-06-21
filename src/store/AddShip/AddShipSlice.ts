import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddShipState, DropDownState } from "types";

const initialState: AddShipState = {
  number: "",
  deliveryDate: "",
  cities: [{ text: "Loading", id: 1, selected: true }],
  quantity: "",
  deliveryType: [{ text: "Loading", id: 1, selected: true }],
  warehouse: [{ text: "Loading", id: 1, selected: true }],
  status: [{ text: "Loading", id: 1, selected: true }],
};

const setSelected = (items: DropDownState[], id: number) => {
  return items.map((item) =>
    item.id === id ? { ...item, selected: true } : { ...item, selected: false },
  );
};

const resetSelection = (items: DropDownState[]) => {
  return items.map((item, index) => ({ ...item, selected: index === 0 }));
};

const addShipSlice = createSlice({
  name: "addShip",
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.deliveryDate = action.payload;
    },
    setCity(state, action: PayloadAction<number>) {
      state.cities = setSelected(state.cities, action.payload);
    },
    setQuantity(state, action: PayloadAction<string>) {
      state.quantity = action.payload;
    },
    setType(state, action: PayloadAction<number>) {
      state.deliveryType = setSelected(state.deliveryType, action.payload);
    },
    setWarehouse(state, action: PayloadAction<number>) {
      state.warehouse = setSelected(state.warehouse, action.payload);
    },
    setStatus(state, action: PayloadAction<number>) {
      state.status = setSelected(state.status, action.payload);
    },
    resetSelections(state) {
      state.cities = resetSelection(state.cities);
      state.deliveryType = resetSelection(state.deliveryType);
      state.warehouse = resetSelection(state.warehouse);
      state.status = resetSelection(state.status);
      state.quantity = "0";
      state.deliveryDate = "";
    },
  },
});

export const {
  setDate,
  setCity,
  setQuantity,
  setType,
  setWarehouse,
  setStatus,
  resetSelections,
  setAll,
} = addShipSlice.actions;

export const addShipReducer = addShipSlice.reducer;
