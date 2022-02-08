import * as ActionType from './ActionType';
import { baseUrl } from './baseUrl';

const Staffs = (state = { isLoading: true, errMes: null, staffs: []}, action) => {
    switch (action.type) {
    case ActionType.STAFFS_LOADING:
        return {...state, isLoading: true, errMes: null, staffs: []};
    case ActionType.STAFFS_LOADED:
        return {...state, isLoading: false, errMes: null, staffs: action.payload};
    case ActionType.STAFFS_LOAD_FAILED:
        return {...state, isLoading: false, errMes: action.payload, staffs: []};
    case ActionType.ADD_STAFF:
        var newStaff = action.payload;
        return {...state, isLoading: false, errMes: null, staffs: newStaff};
    case ActionType.DELETE_STAFF:
        var id = action.payload;
        var convertedId = id.toString();

        fetch(baseUrl + 'staffs/' + id, {
            method: 'DELETE',
            body: convertedId,
            headers: {
                'Content-Type': 'charset=UTF-8',
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(`Error${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => {response.json(); console.log(response)})
        .catch(error => { alert("Try again") ; console.log(error.message)})

        const newList = state.staffs.filter((staff) => (staff.id !== id));
        return {...state, isLoading: false, errMes: null, staffs: newList}
    case ActionType.EDIT_STAFF:
        var editStaff = action.payload;
        return {...state, isLoading: false, errMes: null, staffs: editStaff}
    default:
        return state;
    }
};

export default Staffs;