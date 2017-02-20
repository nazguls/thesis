import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
//middleware
import ReduxThunk from 'redux-thunk';
import Router from './Router';

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
		)
	}
}

export default App;


/**
import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';
//handles routing
// import { Router, Scene } from 'react-native-router-flux';


//keep track of all the pages
import Index from './src/components/home/index';
import IndStock from './src/components/indStock/index';
import Buy from './src/components/indStock/buy'
import BuySell from './src/components/indStock/buySell'


class App extends Component {

  //function that renderscene is using
  constructor() {
    super()
    this.renderScene= this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    // _navigator = navigator;
    switch (route.id) {
      case 'index':
        return (<Index navigator={navigator} title = "index" />);
      case 'indStock':
        return (<IndStock navigator={navigator} title = 'indStock' />);
      case 'buy':
        return (<Buy navigator={navigator} title = 'buy' />)
    }
    // if(route.id === 'index'){
    //   return <Index navigator={navigator} />;
    // }
  }

  render() {

    return (
      <Navigator
        initialRoute={{id: 'index'}}
        renderScene={ this.renderScene }
      />
    );
  }
}

**/