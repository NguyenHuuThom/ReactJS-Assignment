import * as ActionType from './ActionType'

const Departments = (state = { isLoading: true, errMes: null, departments: [] }, action) => {
    switch (action.type) {
    case ActionType.DEPARTMENTS_LOADING:
        return {...state, isLoading: true, errMes: null, departments: []};
    case ActionType.DEPARTMENTS_LOADED:
        return {...state, isLoading: false, errMes: null, departments: action.payload};
    case ActionType.DEPARTMENTS_FAILED:
        return {...state, isLoading: false, errMes: action.payload, departments: []};
    default:
        return state;
    }
};

export default Departments;