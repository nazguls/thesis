import {
	SEARCH_CHANGED,
	STOCK_RESULT,
	STOCK_SHARE_CHANGED,
	CHART_VIEW,
	RECOMMENDATIONS
} from '../actions/types';

const INITIAL_STATE = {
	search: '',
	stockRes: {},
	stockShare: '',
	chartView: 'Share Price',
	recommendations: 'hello There'

};

export default (state = INITIAL_STATE, action) => {
	console.log('actions in redducer', action);
	switch (action.type) {
		case RECOMMENDATIONS:
			return { ...state, recommendations: action.payload };
		case SEARCH_CHANGED:
			return { ...state, search: action.payload };
		case STOCK_RESULT:
			return { ...state, stockRes: action.payload };
		case STOCK_SHARE_CHANGED:
			return { ...state, stockShare: action.payload };
		case CHART_VIEW:
			return { ...state, chartView: action.payload };
		default:
			return state;
	}
};
