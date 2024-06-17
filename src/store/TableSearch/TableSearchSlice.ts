import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Search {
  text: string;
  id: number;
  selected: boolean;
}

interface State {
  data: Search[];
}

const initialState: State = {
  data: [
    { text: "По номеру", id: 1, selected: true },
    { text: "По городу", id: 2, selected: false },
    { text: "По типу поставки", id: 3, selected: false },
    { text: "По статусу", id: 4, selected: false },
  ],
};

const selectTableSearch = createSlice({
  name: "tableSearch",
  initialState,
  reducers: {
    setTableSearch(state, action: PayloadAction<number>) {
      const searchId = action.payload;
      state.data = state.data.map((item) =>
        item.id === searchId
          ? { ...item, selected: true }
          : { ...item, selected: false },
      );
    },
  },
});

export const { setTableSearch } = selectTableSearch.actions;

export const selectTableSearchReducer = selectTableSearch.reducer;
