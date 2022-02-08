import { createStore, combineReducers, applyMiddleware } from "redux";
import Departments from "./Departments";
import Staffs from "./Staffs";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import staffsSalaries from "./Salaries";
import DepStaffs from "./DepStaffs";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            staffsSalaries: staffsSalaries,
            depStaffs: DepStaffs
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}