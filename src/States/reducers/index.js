import { combineReducers } from "redux";
import totalReducer from "./totalReducer";
import setLogin from "./LoginCheck";
const reducers = combineReducers({
	total: totalReducer,
    isLogin : setLogin
})
export default reducers;
