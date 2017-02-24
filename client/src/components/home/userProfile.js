import React, { Component } from 'react';
import { 
	View,
	Text 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class UserProfile extends Component {
	
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
		console.log(this.props);
		return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
					{this.props.user.name}
        </Text>
        <Text style={styles.navItems}>
					MARKET VALUE: {this.props.user.mktValue}
        </Text>
        <Text style={styles.navItems}>
					CASH: {this.props.user.cash}
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

const mapStateToProps = (state) => {
	return { user: state.user };
};

export default connect(mapStateToProps, {})(UserProfile);
