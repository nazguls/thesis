import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/home/index';
import IndStock from './components/indStock/index';
import buy from './components/indStock/buy';
import sell from './components/indStock/sell';
import userProfile from './components/home/slideUserProfile'
import search from './components/home/search';

////////////////////////////////////////////////////////////////////////
//icons//
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Foundation';
////////////////////////////////////////////////////////////////////////

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="auth">
				<Scene key='login' component={LoginForm} title="Please Login" />
			</Scene>

			<Scene key="main" initial >
				<Scene
					key='home'
					component={Home}
					title="DashBoard"
					rightTitle="search"

					onRight={() => Actions.search()}

					leftTitle="profile"
					onLeft={() => Actions.userProfile()}
				/>
				<Scene key='indStock' component={IndStock} title="Stock Description" />
				<Scene key='buy' component={buy} title="Market Buy" />
				<Scene key='sell' component={sell} title="Market Sell" />
        <Scene key='userProfile' component={userProfile} title="User Profile" />

        <Scene key='search' component={search} title="Search" />
			</Scene>


		</Router>
	);
};

export default RouterComponent;

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