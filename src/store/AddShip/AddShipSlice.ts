import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface City {
  text: string;
  id: number;
  selected: boolean;
}

interface State {
  shippingData: {
    date: string;
  };
  cities: City[];
  quantity: number;
  type: City[];
  warehouse: City[];
  status: City[];
}

const initialState: State = {
  shippingData: {
    date: "",
  },
  cities: [
    { text: "Москва", id: 1, selected: true },
    { text: "Псков", id: 2, selected: false },
    { text: "Тверь", id: 3, selected: false },
    { text: "Абакан", id: 4, selected: false },
    { text: "Нижний Новгород", id: 5, selected: false },
    { text: "Кострома", id: 6, selected: false },
    { text: "Ярославль", id: 7, selected: false },
  ],
  quantity: 0,
  type: [
    { text: "Короб", id: 1, selected: true },
    { text: "Монопаллета", id: 2, selected: false },
  ],
  warehouse: [
    { text: "Склад", id: 1, selected: true },
    { text: "СЦ Абакан", id: 2, selected: false },
    { text: "Черная грязь", id: 3, selected: false },
    { text: "Внуково", id: 4, selected: false },
    { text: "Белая дача", id: 5, selected: false },
    { text: "Электросталь", id: 6, selected: false },
    { text: "Вёшки", id: 7, selected: false },
  ],
  status: [
    { text: "В пути", id: 1, selected: true },
    { text: "Задерживается", id: 2, selected: false },
  ],
};

const setSelected = (items: City[], id: number) => {
  return items.map((item) =>
    item.id === id ? { ...item, selected: true } : { ...item, selected: false },
  );
};

const resetSelection = (items: City[]) => {
  return items.map((item, index) => ({ ...item, selected: index === 0 }));
};

const addShipSlice = createSlice({
  name: "addModal",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.shippingData.date = action.payload;
    },
    setCitySelected(state, action: PayloadAction<number>) {
      state.cities = setSelected(state.cities, action.payload);
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
    setType(state, action: PayloadAction<number>) {
      state.type = setSelected(state.type, action.payload);
    },
    setWarehouse(state, action: PayloadAction<number>) {
      state.warehouse = setSelected(state.warehouse, action.payload);
    },
    setStatus(state, action: PayloadAction<number>) {
      state.status = setSelected(state.status, action.payload);
    },
    resetSelections(state) {
      state.cities = resetSelection(state.cities);
      state.type = resetSelection(state.type);
      state.warehouse = resetSelection(state.warehouse);
      state.status = resetSelection(state.status);
      state.quantity = 0;
      state.shippingData.date = "";
    },
  },
});

export const {
  setDate,
  setCitySelected,
  setQuantity,
  setType,
  setWarehouse,
  setStatus,
  resetSelections,
} = addShipSlice.actions;

export const addShipReducer = addShipSlice.reducer;
