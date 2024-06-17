import { combineReducers } from "@reduxjs/toolkit";
import { addShipReducer } from "./AddShip/AddShipSlice";
import { selectTableSearchReducer } from "./TableSearch/TableSearchSlice";
import { isOpenReducer } from "./OpenDropDownMenu/isOpenSlice";

export const rootReducer = combineReducers({
  addModal: addShipReducer,
  selectSearch: selectTableSearchReducer,
  setIsOpen: isOpenReducer,
});
