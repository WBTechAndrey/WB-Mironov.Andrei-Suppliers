import { RootState } from "../store";

export const selectSearch = (state: RootState) => state.selectSearch.data;
