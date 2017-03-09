import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { rankings } from '../../actions';


class PerformanceModal extends Component {

	state = {
		modalVisible: true
	}

	componentDidMount() {
		// var sortedRanking = ''
		const context = this;
		axios.post('http://127.0.0.1:3000/api/portfolio/' + this.props.user.email)
		.then(result => {
			const sortedResult = result.data.sort((x, y) => (y.portfolioValue - x.portfolioValue));
			context.props.rankings(sortedResult);
		});
	}

	userReturn() {
		for (let i = 0; i < this.props.user.rank.length; i++) {
			if (this.props.user.rank[i].username === this.props.user.username) {
				return Math.round((this.props.user.rank[i].portfolioValue / 10000) * 100) / 100;
			}
		}
	}

	ranking() {
		const rankingArray = [];
		console.log('rank', this.props.user.rank);
		this.props.user.rank.map(obj => {
			if (rankingArray.indexOf(obj.username) === -1) {
						rankingArray.push(obj.username);
					}
			});
		for (let i = 0; i < rankingArray; i++) {
			if (rankingArray[i] === this.props.user.username) {
				return i + 1;
			}
		}
	}

	render() {

		return (
			<View >
				<Modal
					animation={'fade'}
					transparent
					visible={this.state.modalVisible}
					onRequestClose={() => { console.log('Modal has been closed'); }}
				>
					<View style={styles.viewStyle}>
						<View style={styles.header}>
						<Icon name="close" color={"white"} size={20} onPress={() => this.setState({ modalVisible: false })} />
							<Text style={styles.userName}>Hi, {this.props.user.firstName}</Text>
							<Text style={styles.textStyle}> HERE IS YOUR SUMMARY </Text>
						</View>
						<View style={styles.boxSection}>
							<Text style={styles.subTitle}> RETURNS </Text>
						</View>

						<View style={styles.containerStyle}>
							<Text style={styles.textStyle2}> YOU </Text>
							<Text style={styles.textStyle2}> VS </Text>
							<Text style={styles.textStyle2}> S&P</Text>
						</View>

						<View style={styles.containerStyle}>
							<Text style={styles.buttonStyle}> {this.userReturn()}% </Text>
							<Text> </Text>
							<Text style={styles.buttonStyle}>  0.34%</Text>
						</View>

						<View style={styles.boxSection}>
							<Text style={styles.textStyle}> YOUR CURRENT RANKING </Text>
						</View>

						<View style={styles.boxSection2}>
							<Text style={styles.textStyle3}> th PLACE </Text>
						</View>
						</View>
				</Modal>
			</View>
		)
	}

}

const styles = {
	viewStyle: {
		marginTop: 70,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: 'black',
		borderRadius: 40,
		opacity: .8,
		// flex: 1,
		// alignItems: 'center',
	},
	subTitle: {
		borderColor: 'orange',
		marginLeft: 20,
		marginRight: 20,
		borderTopWidth: 2,
		color: 'orange',
		alignSelf: 'center',
		marginTop: 5,
	},
	header: {
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 15
	},
	userName: {
		marginTop: 30,
		fontWeight: '200',
		marginBottom: 5,
		color: '#42f4c2',
		fontSize: 35
	},
	textStyle: {
		marginTop: 15,
		color: '#42f4c2',
		fontSize: 20,
	},
	textStyle2: {
		color: 'orange',
		fontSize: 17,
	},
	textStyle3: {
		color: '#42f4c2',
		fontSize: 20,
		marginTop: 20,
		marginBottom: 30
	},
	buttonStyle: {
		borderWidth: 1,
		padding: 5,
		fontSize: 17,
		color: 'orange',
		borderRadius: 10,
    borderColor: 'orange'
	},
	containerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'stretch',
		margin: 7
	},
	boxSection: {
		margin: 15,
		borderTopWidth: 1,
		borderColor: 'orange',
		alignItems: 'center'
		// alignSelf: 'center'
	},
	boxSection2: {
		margin: 15,
		alignItems: 'center'

		// alignSelf: 'center'
	}
};

const mapStateToProps = (state) => {
	console.log('state' , state)
	return {
		user: state.user
  };
};

export default connect(mapStateToProps, { rankings })(PerformanceModal);
