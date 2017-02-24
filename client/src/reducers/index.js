import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import UserReducer from './UserReducer';

export default combineReducers({

	auth: AuthReducer,
	search: SearchReducer,
	user: UserReducer

});

