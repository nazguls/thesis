import {
	USERNAME_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  MARKET_VALUE,
  CASH_VALUE,
  NOCASH,
  NUMSHARES
} from '../actions/types';

const INITIAL_STATE = {
	username: '',
	firstName: '',
	lastName: '',
	mktValue: 0,
	cashValue: 0,
	noCash: false,
	numShares: 0

};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NUMSHARES:
			return { ...state, numShares: action.payload };
		case USERNAME_CHANGED:
			return { ...state, username: action.payload };
		case FIRST_NAME_CHANGED:
			return { ...state, firstName: action.payload };
		case LAST_NAME_CHANGED:
			return { ...state, lastName: action.payload };
		case MARKET_VALUE:
			return { ...state, mktValue: action.payload };
		case CASH_VALUE:
			return { ...state, cashValue: action.payload };
		case NOCASH:
			return { ...state, noCash: action.payload };
		default:
			return state;
	}
};
