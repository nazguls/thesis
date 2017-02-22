import React, { Component } from 'react';
import { 
	View,
	Text 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SlideUserProfile extends Component {
	
  render() {
		const styles = {
			controlPanel: {
				flex: 1,
				backgroundColor: '#2FCD9A',
			},
			controlPanelWelcome: {
				fontSize: 20,
				textAlign: 'center',
				marginTop: 40,
				color: 'white',
				fontWeight: 'bold',
      },
      navItems: {
				fontSize: 12,
				textAlign: 'left',
				margin: 20,
				color: 'white',
				fontWeight: 'bold',
      },
		};
		return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
					ISAAC YOON
        </Text>
        <Text style={styles.navItems}>
					MARKET VALUE: 
        </Text>
        <Text style={styles.navItems}>
					CASH:
        </Text>
        <Text style={styles.navItems}>
					<Icon name='account-balance' size={20} />  ACCOUNT
        </Text>
        <Text style={styles.navItems}>
					<Icon name='history' size={20} />  HISTORY
        </Text>
        <Text style={styles.navItems}>
					<Icon name='people' size={20} />  REFER FRIENDS
        </Text>
        <Text style={styles.navItems}>
					<Icon name='help' size={20} />  HELP
        </Text>
        
      </View>
    );
  }
}

export default SlideUserProfile;
