const setLogin = (state = false, action) => {
	switch(action.type){
	case 'Login':
		return (state = action.payload);
	default:
		return state;
	}
}
export default setLogin;