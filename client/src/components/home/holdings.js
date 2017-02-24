import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { searchStock } from '../../actions';
import { connect } from 'react-redux';

class Holdings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			portfolio: []
		};
	}

	componentWillMount() {
		const context = this;
		axios.get('http://localhost:3000/api/portfolio/' + 'isaac1?period=current')
		.then(function(response) {
			context.setState({
				portfolio: response
			});
		}).catch(function(error) {
			console.log(error);
		});
	}

	onButtonPress(text) {
		const searchQuery = text.symbol;
		console.log('searchQuery', searchQuery);
		this.props.searchStock( {search: searchQuery} );
	}

	render() {
		if (this.state.portfolio.length === 0) {
			return <View></View>;
		}
		const { data } = this.state.portfolio;
		const { viewStyle, container, textStyle } = styles;
		const stockData = data.map((stock, key)=> {
			return (
				<TouchableHighlight key={key} onPress={this.onButtonPress.bind(this, stock)}>
					<View style={viewStyle} >
					<Text style={textStyle}> {stock.symbol} </Text>
					<Text style={textStyle}> {Math.round(stock.marketValue*100)/100} </Text>
					</View>
				</TouchableHighlight>
			)}
		);

		return (
			<View style={container} >
				<ScrollView>
					{stockData}
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		// marginBottom: 10,
		paddingTop: 20,
		paddingBottom: 20,
		// paddingRight: 10,
		// paddingLeft: 10,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		borderColor: '#ddd',
    borderBottomWidth: 1,
		alignSelf: 'stretch',
		backgroundColor: '#F8F8F8',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},
	container:{
		flex: 1,
		alignSelf: 'stretch'
	},
	textStyle: {
		fontSize: 17
	}

};

	// return (
	// 			<View style={styles.viewStyle} >
	// 				<TouchableHighlight onPress={() => Actions.indStock()}>
	// 					<Text> AAPL </Text>
	// 				</TouchableHighlight>
	// 					<Text> .25% </Text>
	// 			</View>
	// 		);

export default connect(null, { searchStock })(Holdings);
