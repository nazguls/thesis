import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { updateMarketValue, updateCashValue } from '../../actions';
import communications from 'react-native-communications';

class UserProfile extends Component {

	componentWillMount() {
		const context = this;
		// axios.get('http://localhost:3000/api/portfolio/isaac1?period=historical')
		// .then(response => {
		// 	const length = response.data.length;
		// 	const mktValue = response.data[length - 1].portfolioValue;
		// 	context.props.updateMarketValue(mktValue);
		// }).catch(error => {
		// 	console.log(error);
		// });

		axios.get('http://127.0.0.1:3000/api/users/isaac1')
		.then(response => {
			const cashValue = response.data.cash;
			context.props.updateCashValue(cashValue);
		}).catch(error => {
			console.log(error);
		});
	}



  render() {
		const styles = {
			controlPanel: {
				flex: 1,
				backgroundColor: '#1b1b1c',
			},
			controlPanelWelcome: {
				fontSize: 30,
				textAlign: 'center',
				fontWeight: '100',
				marginTop: 30,
				color: '#42f4c2',
				marginBottom: 30
      },
      navItems: {
				fontSize: 20,
				textAlign: 'left',
				marginLeft: 20,
				marginBottom: 20,
				color: 'white',
				fontWeight: '100',
				color: '#42f4c2'
      },
		};
		console.log(this.props);
		return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
					Hi, {this.props.user.name}!
        </Text>
        <Text style={styles.navItems}>
					MARKET VALUE
        </Text>
        <Text style={styles.navItems}>
          $ {Math.round(this.props.user.mktValue * 100) / 100}
        </Text>
        <Text style={styles.navItems}>
					CASH
        </Text>
        <Text style={styles.navItems}>
					$ {this.props.user.cashValue}
        </Text>
        <Text style={styles.navItems} onPress={() => Actions.deposit()}>
					<Icon name='account-balance' size={20} />  ACCOUNT
        </Text>
        <Text style={styles.navItems} onPress={() => Actions.history()}>
					<Icon name='history' size={20} />  HISTORY
        </Text>
        <Text style={styles.navItems}>
					<Icon name='people' size={20} onPress={() => communications.text(null, 'Hey I found this great stock website where you can trade for free! Check it out :D')}/>  REFER FRIENDS
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

export default connect(mapStateToProps, { updateMarketValue, updateCashValue })(UserProfile);
