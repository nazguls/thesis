import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Background } from './common/';

class History extends Component {
	constructor() {
		super();
		this.state = {
			transactions: null,
			history: null
		};
	}
  componentWillMount() {
		const context = this;
		const email = this.props.email;
		axios.get(`http://127.0.0.1:3000/api/transaction/${email}`)
		.then(response => {
			console.log('20-----------', response.data);
			context.setState({
				transactions: response.data
			});
		}).catch(error => {
			console.log(error);
		});
		axios.get(`http://localhost:3000/api/portfolio/${email}?period=historical`)
		.then(response => {
			console.log('29-----------', response.data);
      context.setState({
				history: response.data
			});	
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		const { viewStyle, textStyle, container, headerStyle } = styles;
		let transactions = [];
		if (this.state.transactions && this.state.history) {
			const length = this.state.history.length;
      transactions = this.state.transactions.map((transaction, key) => {
				return (
					<View style={viewStyle} key={key}>
            <Text style={textStyle}>{transaction.date.slice(0, 10)}</Text> 
            <Text style={textStyle}>{transaction.type}</Text>
            <Text style={textStyle}>{transaction.numOfShares}</Text>
            <Text style={textStyle}>{transaction.purchasePrice}</Text> 
            <Text style={textStyle}>{this.state.history[length - key - 1].cash}</Text>
          </View>
				);
			});
    }
			

		return (
			<Background>
        <View style={container} >
          <Text style={headerStyle}>Transactions History</Text>
          <View style={viewStyle}>
            <Text style={textStyle}>DATE</Text> 
            <Text style={textStyle}>TYPE</Text>
            <Text style={textStyle}>SHARES</Text>
            <Text style={textStyle}>PRICE</Text> 
            <Text style={textStyle}>BALANCE</Text>
          </View>  
					<ScrollView >
            {transactions}
          </ScrollView>
				</View>
			</Background>
    );
	}
}

const styles = {
	viewStyle: {
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		borderColor: '#ddd',
    borderBottomWidth: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},
	textStyle: {
		fontSize: 14,
		color: '#42f4c2',
		backgroundColor: 'transparent'
	},
	headerStyle: {
		paddingTop: 20,
		fontSize: 24,
		color: '#42f4c2',
		backgroundColor: 'transparent',
		textAlign: 'center'
	},
	container: {
		flex: 1,
		alignSelf: 'stretch'
	}
};
const mapStateToProps = (state) => {
 const { email } = state.auth;
  return ({
    email
  });
};

export default connect(mapStateToProps, {})(History);

