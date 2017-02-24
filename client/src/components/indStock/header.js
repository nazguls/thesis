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
					<Text style={{ color: '#42f4c2', marginBottom: 20 }}>{stockRes.data.Symbol}</Text>
				</View>
		);
	};
}

const styles = {
	viewStyle: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		position: 'relative',
		borderBottomWidth: 1,
		borderColor: 'grey'
	},
	textStyle: {
		fontSize: 20,
		color: '#42f4c2'

	}

};

const mapStateToProps = ({ search }) => {
	const { stockRes } = search;
	return {
		stockRes
	};
};


export default connect(mapStateToProps, {})(Header);
