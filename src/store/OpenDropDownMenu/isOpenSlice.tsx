import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Flag {
  activeId: string | null;
}

const initialState: Flag = {
  activeId: null,
};

const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<string | null>) {
      state.activeId = action.payload;
    },
  },
});

export const { setActiveId } = isOpenSlice.actions;

export const isOpenReducer = isOpenSlice.reducer;
