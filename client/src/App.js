import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';
import reducers from './reducers';

class App extends Component {

	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyCAHvzL4hxUvEzY7ZuuZby9snaQNZw1cto',
			authDomain: 'manager-e9f84.firebaseapp.com',
			databaseURL: 'https://manager-e9f84.firebaseio.com',
			storageBucket: 'manager-e9f84.appspot.com',
			messagingSenderId: '968270480798'
  };
    firebase.initializeApp(config);
	}

	render() {
		//second parameter has to do with server side rendering
		//third argument adding additional functionality to store
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
