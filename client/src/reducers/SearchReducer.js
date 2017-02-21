import {
	SEARCH_CHANGED,
	STOCK_RESULT
} from '../actions/types';

const INITIAL_STATE = {
	search: '',
	stockRes: {}

};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case SEARCH_CHANGED:
			return { ...state, search: action.payload };
		case STOCK_RESULT:
			return { ...state, stockRes: action.payload };
		default:
			return state;
	}
}