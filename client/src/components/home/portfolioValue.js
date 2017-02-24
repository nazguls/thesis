import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class PortfolioValue extends Component {
	render() {
		const { textStyle } = styles;
		return (
			<Text style={styles.textStyle}> ${Math.round((this.props.mktValue + this.props.cashValue) * 100) / 100 } </Text>
		);
	}
}
const styles = {

	textStyle: {
		marginTop: 30,
		backgroundColor: 'transparent',
		color: '#42f4c2',
		fontSize: 40,
		fontWeight: '100'
	}
};

const mapStateToProps = ({ user }) => {
	const { mktValue, cashValue } = user;
	return ({
		mktValue,
		cashValue
	});
};


export default connect(mapStateToProps, {})(PortfolioValue);
