import { combineReducers } from "redux";
import branchesReducer from "./branchesReducer";
import commonReducer from "./commonReducer";
import coursesReducer from "./coursesReducer";
import categoriesReducer from "./categoriesReducer";
import locationsReducer from "./locationsReducer";
import PriviledgesReducer from "./PriviledgesReducer";
import salesReducer from "../reducers/salesReducer";
import tarrifsReducer from "../reducers/tarrifsReducer";
import transactionsReducer from "../reducers/transactionsReducer";
import usersReducer from "../reducers/usersReducer";
import utilitiesReducer from "../reducers/utilitiesReducer";

export default combineReducers({
  branchesReducer,
  coursesReducer,
  commonReducer,
  categoriesReducer,
  locationsReducer,
  PriviledgesReducer,
  salesReducer,
  tarrifsReducer,
  transactionsReducer,
  usersReducer,
  utilitiesReducer
})