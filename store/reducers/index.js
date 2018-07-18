import {combineReducers} from "redux";
import {userMager} from "./userMager.js";
import {globals} from "./globals";
let reducer=combineReducers({
    userMager,globals
})
 export default reducer;