import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropDownState, EditShipState } from "../../types";

export type EditShipSlice = Omit<EditShipState, "deliveryDate">;

const initialState: Omit<EditShipState, "deliveryDate"> = {
  number: "",
  id: "",
  quantity: "",
  cities: [{ text: "", id: 1, selected: true }],
  deliveryType: [{ text: "", id: 1, selected: true }],
  warehouse: [{ text: "", id: 1, selected: true }],
  status: [{ text: "", id: 1, selected: true }],
};

const setSelected = (items: DropDownState[], id: number) => {
  return items.map((item) =>
    item.id === id ? { ...item, selected: true } : { ...item, selected: false },
  );
};

const editShipSlice = createSlice({
  name: "editShip",
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload;
    },
    setCity(state, action: PayloadAction<number>) {
      state.cities = setSelected(state.cities, action.payload);
    },
    setType(state, action: PayloadAction<number>) {
      state.deliveryType = setSelected(state.deliveryType, action.payload);
    },
    setQuantity(state, action: PayloadAction<string>) {
      state.quantity = action.payload;
    },
    setWarehouse(state, action: PayloadAction<number>) {
      state.warehouse = setSelected(state.warehouse, action.payload);
    },
    setStatus(state, action: PayloadAction<number>) {
      state.status = setSelected(state.status, action.payload);
    },
  },
});

export const {
  setCity,
  setType,
  setQuantity,
  setWarehouse,
  setStatus,
  setAll,
} = editShipSlice.actions;

export const editShipReducer = editShipSlice.reducer;
