import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUp from './components/signup';
import Home from './components/home/index';
import IndStock from './components/indStock/index';
import buy from './components/indStock/buy';
import sell from './components/indStock/sell';
import drawer from './components/home/drawerComponent';
import search from './components/home/search';
import accountIcon from './components/assets/ic_account_circle.png';
import deposit from './components/Deposit';
import history from './components/History';
import compare from './components/Compare';

const RouterComponent = () => {
	return (
		<Router >
			<Scene key="auth" initial>
				<Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          hideNavBar='false'

      />
        <Scene
          key="signup"
          component={SignUp}
          title="Please Sign Up"
          hideNavBar='false'
        />

			</Scene>

      <Scene
        key="drawer"
        component={drawer}
        open={false}
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
          leftTitle="Home"
          onLeft={() => Actions.home()}
          sceneStyle={{ paddingTop: 60 }}
        />
        <Scene key='search' component={search} title="Search" sceneStyle={{ paddingTop: 60 }} />

        <Scene
        key='buy'
        component={buy}
        title="Market Buy"
        sceneStyle={{ paddingTop: 60 }}
        leftTitle="back"
        onLeft={() => Actions.pop()}
        />
        <Scene
        key='sell'
        component={sell}
        title="Market Sell"
        sceneStyle={{ paddingTop: 60 }}
        leftTitle="back"
        onLeft={() => Actions.pop()}
        />
        </Scene>
      </Scene>


         <Scene key="deposit" component={deposit} title='Deposit' sceneStyle={{ paddingTop: 60 }} />
         <Scene key='history' component={history} title='History' sceneStyle={{ paddingTop: 60 }} />
         <Scene key='verses' component={compare} title='Performance' sceneStyle={{ paddingTop: 60 }} />

    </Router>
	);
};

export default RouterComponent;
