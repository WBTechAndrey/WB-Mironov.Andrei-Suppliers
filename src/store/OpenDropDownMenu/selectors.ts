import { RootState } from "../store";

export const selectActiveId = (state: RootState) => state.setIsOpen.activeId;
export const selectActiveModalsId = (state: RootState) =>
  state.setIsOpen.activeModalsId;
export const selectActiveTableId = (state: RootState) =>
  state.setIsOpen.activeTableId;
