import {
  MARKET_VALUE,
  CASH_VALUE	
} from '../actions/types';

const INITIAL_STATE = {
	name: 'Isaac Yoon',
	mktValue: 0,
	cashValue: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MARKET_VALUE:
			return { ...state, mktValue: action.payload };
		case CASH_VALUE:
			return { ...state, cashValue: action.payload };	
		default:
			return state;
	}
};
