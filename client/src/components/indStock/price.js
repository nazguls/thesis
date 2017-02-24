import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';



class Price extends Component {

	render() {
		const { viewStyle, textStyle } = styles;
		const { stockRes } = this.props;

		return (
			<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>{stockRes.data.LastPrice}</Text>
			</View>
		);
	}
}

const styles = {
	viewStyle: {
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15,
		position: 'relative',
		backgroundColor: 'transparent'
	},
	textStyle: {
		fontSize: 45,
		color: '#42f4c2',
		fontWeight: '100'
	}
};

const mapStateToProps = ({ search }) => {

	const { stockRes } = search;
	return {
		stockRes
	};
};

export default connect(mapStateToProps, {})(Price);
