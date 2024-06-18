import { combineReducers } from "@reduxjs/toolkit";
import { addShipReducer } from "./AddShip/AddShipSlice";
import { selectTableSearchReducer } from "./TableSearch/TableSearchSlice";
import { isOpenReducer } from "./OpenDropDownMenu/isOpenSlice";
import { testAPI } from "./API/testApi";
import { editShipReducer } from "./EditShip/EditShipSlice";

export const rootReducer = combineReducers({
  addShip: addShipReducer,
  editShip: editShipReducer,
  selectSearch: selectTableSearchReducer,
  setIsOpen: isOpenReducer,
  [testAPI.reducerPath]: testAPI.reducer,
});
