import {
	SEARCH_CHANGED,
	STOCK_RESULT,
	STOCK_SHARE_CHANGED,
	CHART_VIEW
} from '../actions/types';

const INITIAL_STATE = {
	search: '',
	stockRes: {},
	stockShare: '',
	chartView: 'Share Price'

};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case SEARCH_CHANGED:
			return { ...state, search: action.payload };
		case STOCK_RESULT:
			return { ...state, stockRes: action.payload };
		case STOCK_SHARE_CHANGED:
			return { ...state, stockShare: action.payload };
		case CHART_VIEW:
			console.log('from search Reducer chartView', action.payload);
			return { ...state, chartView: action.payload };
		default:
			return state;
	}
};
