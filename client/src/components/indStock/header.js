import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';


class Header extends Component {
	render() {
		const { textStyle, viewStyle } = styles;
		const { stockRes } = this.props;
		return (

				<View style={viewStyle}>
					<Text style={textStyle}>{stockRes.data.Name}</Text>
					<Text>{stockRes.data.Symbol}</Text>
				</View>
		);
	};
}

const styles = {
	viewStyle: {
		// marginBottom: 10,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}

};

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};


export default connect(mapStateToProps, {})(Header);
