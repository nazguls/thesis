import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SEARCH_CHANGED,
	SEARCH_STOCK,
	STOCK_RESULT,
	STOCK_SHARE_CHANGED
} from './types';
import axios from 'axios';

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
	console.log('search from index', search)
	console.log('from search stock' , search);
	return (dispatch) => {
		axios.get('http://localhost:3000/api/stocks/'+ search +'?period=current')
		.then((stockInfo) => indStockFetched(dispatch, stockInfo))
		.catch((error) => console.log(error));
	};
};

const indStockFetched = (dispatch, stockInfo) => {
	console.log('stockInfo fetched', stockInfo);
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
		.then(user => loginUserSuccess(dispatch, user))
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