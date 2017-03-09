import React, { Component } from 'react';
import { Button, Background, CardSection, Input } from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Text, View, ScrollView } from 'react-native';

class Compare extends Component {
	constructor() {
		super();

		this.state = {
			ranking: []
		};
	}

	componentDidMount() {
		// var sortedRanking = ''
		const context = this;
		const rankingArray = [];
		axios.post('http://127.0.0.1:3000/api/portfolio/iyoon@gmail.com')
		.then(result => {
				const sortedResult = result.data.sort((x, y) => (y.portfolioValue - x.portfolioValue));
				sortedResult.map(obj => {
					if (rankingArray.indexOf(obj.username) === -1) {
						rankingArray.push(obj.username);
					}
				});
				context.setState({ ranking: rankingArray });
		});
	}

	render() {
		const rankingArray = this.state.ranking.map((result, key) =>

			<View style={styles.columnStyle}>
				<Text style={styles.textStyle}> {key} </Text>
				<Text style={styles.textStyle}> {result}</Text>
			</View>
		);
		console.log('ranking', this.state.ranking);
		return (
			<Background>
				<ScrollView>
					{ rankingArray }
				</ScrollView>
			</Background>
		);
	}
}

const styles = {
	viewStyle: {
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		position: 'relative',
		alignItems: 'center',
	},
	columnStyle: {
		marginLeft: 5,
		marginRight: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		justifyContent: 'space-between',
		flex: 1,
		borderColor: 'grey'
	},
	textStyle: {
		backgroundColor: 'transparent',
		fontSize: 20,
		color: '#42f4c2'
	}
};

export default Compare;