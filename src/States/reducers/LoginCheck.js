const setLogin = (state = false, action) => {
    debugger
	switch(action.type){
	case 'Login':
		return state = action;
	default:
		return state;
	}
}
export default setLogin;