import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../common/'


class Buy extends Component {

	constructor (props) {
		super(props);
	}

	render() {
		const { viewStyle, textStyle } = styles;
		return (
			<Card>
				<CardSection>
					<Input
						label="Shares"
						placeholder="0"
					/>
				</CardSection>

				<CardSection>
					<Input
						label="MKT Price"
						placeholder="100"
					/>
				</CardSection>

				<CardSection>
					<Input
						label="EST Cost"
						placeholder="500"
					/>
				</CardSection>

				<CardSection>
					<Button>
						Confirm
					</Button>
				</CardSection>
			</Card>
	  );
	}
}

const styles = {
	viewStyle: {
		marginTop: 20,
		marginBottom: 10,
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

export default Buy;