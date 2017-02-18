import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//handles routing
import { Router, Scene } from 'react-native-router-flux';


//keep track of all the pages
import Index from './src/components/home/index';
import indStock from './src/components/indStock/index'

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key = "root">

          <Scene
            key = "index"
            component = {Index}
            initial
          />
          <Scene
            key = "indStock"
            component = {indStock}
          />
        </Scene>
      </Router>
    )
  }
  //function that renderscene is using

}


AppRegistry.registerComponent('client', () => App);
