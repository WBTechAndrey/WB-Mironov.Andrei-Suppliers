import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Flag {
  activeId: string | null;
  activeModalsId: string | null;
  activeTableId: string | null;
}

const initialState: Flag = {
  activeId: null,
  activeModalsId: null,
  activeTableId: null,
};

const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<string | null>) {
      state.activeId = action.payload;
    },
    setActiveModalsId(state, action: PayloadAction<string | null>) {
      state.activeModalsId = action.payload;
    },
    setActiveTableId(state, action: PayloadAction<string | null>) {
      state.activeTableId = action.payload;
    },
  },
});

export const { setActiveId, setActiveModalsId, setActiveTableId } =
  isOpenSlice.actions;

export const isOpenReducer = isOpenSlice.reducer;
