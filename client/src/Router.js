import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/home/index';
import IndStock from './components/indStock/index';
import buy from './components/indStock/buy';
import sell from './components/indStock/sell';
import drawer from './components/home/drawerComponent';
import search from './components/home/search';
import accountIcon from './components/assets/ic_account_circle.png';
import deposit from './components/Deposit';

const RouterComponent = () => {
	return (
		<Router >
			<Scene key="auth">
				<Scene key='login' component={LoginForm} title="Please Login" />
			</Scene>
      <Scene
        key="drawer"
        component={drawer}
        open={false}
        initial
      >
			<Scene key="main" >
        <Scene
          sceneStyle={{ paddingTop: 60 }}
					key='home'
					component={Home}
					title="DashBoard"
					rightTitle="search"
          leftButtonImage={accountIcon}
					onRight={() => Actions.search()}
          onLeft={() => Actions.refresh({ key: 'drawer', open: value => !value })}
        />
        <Scene
          key='indStock'
          component={IndStock}
          title="Stock Description"
          sceneStyle={{ paddingTop: 60 }}
        />
				<Scene key='buy' component={buy} title="Market Buy" sceneStyle={{ paddingTop: 60 }} />
				<Scene key='sell' component={sell} title="Market Sell" sceneStyle={{ paddingTop: 60 }} />


        <Scene key='search' component={search} title="Search" sceneStyle={{ paddingTop: 60 }} />
         <Scene key="deposit" component={deposit} title='Deposit' sceneStyle={{ paddingTop: 60 }} />
			</Scene>
      </Scene>
    </Router>
	);
};

export default RouterComponent;
