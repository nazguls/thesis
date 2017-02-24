import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { updateMarketValue, updateCashValue } from '../../actions';

class UserProfile extends Component {

	componentWillMount() {
		const context = this;
		axios.get('http://localhost:3000/api/portfolio/isaac1?period=historical')
		.then(response => {
			const length = response.data.length;
			const mktValue = response.data[length - 1].portfolioValue;
			context.props.updateMarketValue(mktValue);
		}).catch(error => {
			console.log(error);
		});

		axios.get('http://localhost:3000/api/users/isaac1')
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
				backgroundColor: '#414244',
			},
			controlPanelWelcome: {

				fontSize: 30,
				textAlign: 'center',
				fontWeight: '100',
				marginTop: 70,
				color: '#42f4c2'

      },
      navItems: {
				fontSize: 20,
				textAlign: 'left',
				margin: 20,
				color: 'white',
				fontWeight: '100',
				color: '#42f4c2'
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
					CASH: {this.props.user.cashValue}
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

export default connect(mapStateToProps, { updateMarketValue, updateCashValue })(UserProfile);
