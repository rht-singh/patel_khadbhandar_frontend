import { combineReducers } from "redux";
import createReducer from "./createReducers";
import authReducer from "./authReducer";


const reducers = combineReducers({
    products:createReducer,
    auth:authReducer
    
})

export default reducers