import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Background, CardSection, Input } from './common';
import axios from 'axios';
import { Text, View, ScrollView, Image } from 'react-native';
import { rankings } from '../actions';


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
		console.log('user rank', this.props.user.rank);
		const sortedResult = this.props.user.rank.sort((x, y) => (y.portfolioValue - x.portfolioValue));
		sortedResult.map(obj => {
			if (rankingArray.indexOf(obj) === -1) {
				rankingArray.push({
					username: obj.username,
					portfolioValue: obj.portfolioValue
				});
			}
		});
		context.setState({ ranking: rankingArray });
	}

	calculateReturn(totalVal) {
		const retVal = Math.round((totalVal / 10000 - 1 ) * 100) * 100 / 100;
		if (totalVal > 10000) {
			return <Text style={styles.textStyle}> {retVal}% </Text>;
		}
			return <Text style={styles.textStyle2}> {retVal}% </Text>;
	}

	render() {
		const rankingArray = this.state.ranking.map((result, key) =>

			<View key={key} style={styles.columnStyle}>
				<Text style={styles.textStyle}> {key + 1} </Text>
				<Text style={styles.textStyle}> {result.username}</Text>
				{(this.calculateReturn(result.portfolioValue))}
			</View>
		);
		console.log('ranking', this.state.ranking);
		return (
			<Background>
				<Image source={require('./assets/crown.png')} style={styles.img}/>
				<Text style={styles.header}> Rankings </Text>
				<ScrollView style={styles.container}>
					{ rankingArray }
				</ScrollView>
			</Background>
		);
	}
}

const styles = {
	img: {
		marginTop: 30,
		width: 100,
		height: 100,
		tintColor: 'orange',
		marginRight: 40
	},
	columnStyle: {
		margin: 5,
		borderBottomWidth: 1,
		borderColor: 'grey',
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		alignSelf: 'stretch',
		marginLeft: 20,
		marginRight: 20
	},
	header: {
		backgroundColor: 'transparent',
		fontSize: 40,
		color: '#42f4c2',
		fontWeight: '100',
		marginBottom: 20

	},
	textStyle: {
		backgroundColor: 'transparent',
		alignSelf: 'flex-end',
		fontSize: 25,
		fontWeight: '200',
		color: '#42f4c2',
		marginBottom: 4
	},
	textStyle2: {
		backgroundColor: 'transparent',
		alignSelf: 'flex-end',
		fontSize: 25,
		fontWeight: '200',
		color: 'orange',
		marginBottom: 4
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		auth: state.auth
  };
};

export default connect(mapStateToProps, { rankings })(Compare);
