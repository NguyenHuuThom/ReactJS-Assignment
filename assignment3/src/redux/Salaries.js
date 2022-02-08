import * as ActionType from './ActionType'

const staffsSalaries = (state = { isLoading: true, errMes: null, staffsSalaries: [] }, action) => {
    switch (action.type) {
    case ActionType.SALARIES_LOADING:
        return {...state, isLoading: true, errMes: null, staffsSalaries: []};
    case ActionType.SALARIES_LOADED:
        return {...state, isLoading: false, errMes: null, staffsSalaries: action.payload};
    case ActionType.SALARIES_FAILED:
        return {...state, isLoading: false, errMes: action.payload, staffsSalaries: []};
    default:
        return state;
    }
};

export default staffsSalaries;