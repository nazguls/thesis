import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
	LAST_NAME_CHANGED,
	FIRST_NAME_CHANGED,
	USERNAME_CHANGED,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SEARCH_CHANGED,
	STOCK_RESULT,
	STOCK_SHARE_CHANGED,
	MARKET_VALUE,
	CASH_VALUE,
	CHART_VIEW,
	RECOMMENDATIONS,
	NOCASH
} from './types';

export const notEnoughFunds = (text) => {
	return {
		type: NOCASH,
		payload: text
	};
};

export const recommendations = (text) => {
	console.log('received in action', text);
	return {
		type: RECOMMENDATIONS,
		payload: text
	};
};

export const selectChartView = (text) => {
	return {
		type: CHART_VIEW,
		payload: text
	};
};

export const updateMarketValue = (text) => {
	return {
		type: MARKET_VALUE,
		payload: text
	};
};

export const updateCashValue = (text) => {
	return {
		type: CASH_VALUE,
		payload: text
	};
};

export const updateStockShare = (text) => {
	return {
		type: STOCK_SHARE_CHANGED,
		payload: text
	};
};

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const usernameChanged = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	};
};

export const updateFirstName = (text) => {
	return {
		type: FIRST_NAME_CHANGED,
		payload: text
	};
};

export const updateLastName = (text) => {
	return {
		type: LAST_NAME_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const searchChanged = (text) => {
	return {
		type: SEARCH_CHANGED,
		payload: text
	};
};

export const searchStock = ({ search }) => {
	return (dispatch) => {
		axios.get(`http://127.0.0.1:3000/api/stocks/${search}?period=current`)
		.then((stockInfo) => indStockFetched(dispatch, stockInfo))
		.catch((error) => console.log(error));
	};
};

const indStockFetched = (dispatch, stockInfo) => {
	dispatch({
		type: STOCK_RESULT,
		payload: stockInfo
	});
	Actions.indStock();
};


export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			console.log(user);
			loginUserSuccess(dispatch, user);
		})
		.catch((error) => {
			console.log(error);
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
		});
	};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.drawer();
};
