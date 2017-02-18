import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';
//handles routing
// import { Router, Scene } from 'react-native-router-flux';


//keep track of all the pages
import Index from './src/components/home/index';
import IndStock from './src/components/indStock/index';
import Buy from './src/components/indStock/buy'


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


AppRegistry.registerComponent('client', () => App);


  // render() {
  //   return (
  //     <Router>
  //       <Scene key = "root">

  //         <Scene
  //           key = "index"
  //           component = {Index}
  //           initial
  //         />
  //         <Scene
  //           key = "indStock"
  //           component = {indStock}
  //         />
  //       </Scene>
  //     </Router>
  //   )
  // }