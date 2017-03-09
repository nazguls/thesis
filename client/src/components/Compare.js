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
		const sortedResult = this.props.user.rank.sort((x, y) => (y.portfolioValue - x.portfolioValue));
		sortedResult.map(obj => {
			if (rankingArray.indexOf(obj.username) === -1) {
				rankingArray.push(obj.username);
			}
		});
		context.setState({ ranking: rankingArray });
	}

	render() {
		const rankingArray = this.state.ranking.map((result, key) =>

			<View style={styles.columnStyle}>
				<Text style={styles.textStyle}> {key+1} </Text>
				<Text style={styles.textStyle}> {result}</Text>
			</View>
		);
		console.log('ranking', this.state.ranking);
		return (
			<Background>
				<Image source={require('./assets/crown.png')} style={styles.img}/>
				<Text style={styles.header}> Rankings </Text>
				<ScrollView>
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
		justifyContent: 'space-between',
		alignSelf: 'stretch',
		marginLeft: 5,
		marginRight: 5,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'grey'
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
		alignItems: 'stretch',
		fontSize: 25,
		fontWeight: '200',
		color: '#42f4c2'
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		auth: state.auth
  };
};

export default connect(mapStateToProps, { rankings })(Compare);
