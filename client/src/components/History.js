import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Background } from './common';


class History extends Component {
	constructor() {
		super();
		this.state = {
			transactions: null
		};
	}
  componentWillMount() {
		const context = this;
		const email = this.props.email;
		axios.get(`http://127.0.0.1:3000/api/transaction/${email}`)
		.then(response => {
			console.log('20-----------',response.data[0]);
			context.setState({
				transactions: response
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		let transactions = [];
		// if (this.state.transactions) {
		// console.log(this.state.transactions.dataValues);
	 //  }
		// if (this.state.transactions) {
		// 	transactions = this.state.transactions.data.map((transaction, key) => {
		// 		return (
		// 				<View key={key}>
		// 						<Text > {transaction.id}, {transaction.symbol} </Text>
		// 				</View>
		// 			);
		// 	});
		// }	

		return (
      <Background>
        <Text >Transactions History</Text>
        {transactions}
      </Background>
    );
	}
}

const mapStateToProps = (state) => {
 const { email } = state.auth;
  return ({
    email
  });
};

export default connect(mapStateToProps, {})(History);

