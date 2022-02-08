import * as ActionType from './ActionType'

const DepStaffs = (state = { isLoading: true, errMes: null, depStaffs: [] }, action) => {
    switch (action.type) {
    case ActionType.DEPSTAFFS_LOADING:
        return {...state, isLoading: true, errMes: null, depStaffs: []};
    case ActionType.DEPSTAFFS_LOADED:
        return {...state, isLoading: false, errMes: null, depStaffs: action.payload};
    case ActionType.DEPSTAFFS_FAILED:
        return {...state, isLoading: false, errMes: action.payload, depStaffs: []};
    default:
        return state;
    }
};

export default DepStaffs;