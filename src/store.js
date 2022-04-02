import { createStore } from 'redux'
import {nanoid} from "nanoid";
const addEmployeeId = (employee) => ({...employee, id: nanoid(6)});


function counterReducer(state = { employees:[] }, action) {
    switch (action.type) {
        case 'addEmployees':
            return { employees: [...state.employees, addEmployeeId(action.payload)] };
        default:
            return state;
    }
}
let store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));

export default store;
