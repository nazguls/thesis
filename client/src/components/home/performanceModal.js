import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from '../common';

class PerformanceModal extends Component {

	state = {
		modalVisible: true
	}

	render() {
		return (
			<View>
				<Modal
					animation={"fade"}
					transparent
					visible={this.state.modalVisible}
					onRequestClose={() => { console.log('Modal has been closed'); }}
				>

					<View style={styles.viewStyle}>
						<View style={styles.header}>
						<Icon name="close" color={"white"} size={20} onPress={() => this.setState({ modalVisible: false })} />
							<Text style={styles.userName}>Hi, Isaac!</Text>
							<Text style={styles.textStyle}> Here is your Summary </Text>
						</View>

						<View style={styles.subTitleView}>
							<Text style={styles.subTitle}> RETURNS </Text>
						</View>
						<CardSection>
						<View style={styles.containerStyle}>
							<Text style={styles.textStyle}> YOU </Text>
							<Text style={styles.textStyle}> VS </Text>
							<Text style={styles.textStyle}> S&P</Text>
						</View>
						</CardSection>
						<CardSection>
						<View style={styles.containerStyle}>
							<Text style={styles.buttonStyle}> 0.34% </Text>
							<Text> </Text>
							<Text style={styles.buttonStyle}>  0.34%</Text>
						</View>
						</CardSection>

						<CardSection>
							<Text style={styles.textStyle}> YOUR CURRENT RANKING </Text>
						</CardSection>
						<CardSection>
							<Text style={{ color: '#42f4c2', fontSize: 40 }}> 6th PLACE </Text>
						</CardSection>
					</View>
				</Modal>
			</View>
		)
	}

}

const styles = {
	viewStyle: {
		margin: 30,
		backgroundColor: 'black',
		borderRadius: 40,
		opacity: .8,
		flex: 1,
		alignItems: 'center',
	},
	// subTitleView:{
	// 	flex:1,
	// 	backgroundColor: '#42f4c2'
	// },
	subTitle: {
		alignSelf: 'stretch',
		padding: 3,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#42f4c2',
		color: 'black',
	},
	header: {
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 15
	},
	userName: {
		marginBottom: 5,
		color: '#42f4c2',
		fontSize: 35
	},
	textStyle: {
		color: '#42f4c2',
		fontSize: 20
	},
	buttonStyle: {
		borderWidth: 1,
		padding: 5,
		fontSize: 17,
		color: '#42f4c2',
		borderRadius: 10,
    borderColor: '#42f4c2'
	},
	containerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

export default PerformanceModal;