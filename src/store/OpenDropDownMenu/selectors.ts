import { RootState } from "../store";

export const selectActiveId = (state: RootState) => state.setIsOpen.activeId;
