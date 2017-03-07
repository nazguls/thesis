import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { View, ART } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';

const { Surface, Group, Shape, } = ART;



const xAccessor = (d) => { return d.date; };
const yAccessor = (d) => { return d.value; };

class Chart extends Component {

  constructor(props) {
		super(props);
    this.state = { lineGraph: '' };
  };

    componentWillMount() {
      var context = this;
      console.log(this.props.email);
      axios.get(`http://localhost:3000/api/portfolio/${this.props.email}?period=historical`).then(response => {
        const data = response.data.map(dataObj => {
          return {
            date: new Date(dataObj.date),
            value: dataObj.portfolioValue
          };
        });
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: 300, height: 200 });
        context.setState({lineGraph: line.path, ticks: line.ticks, scale: line.scale }, () => {console.log('41' )});
        });
    }

    render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <Surface width={500} height={200}>
          <Group x={100} y={0}>
           <Shape
              d={this.state.lineGraph}
              stroke="orange"
              strokeWidth={3}
           />
          </Group>
        </Surface>
        </View>
    );
  }
}



const mapStateToProps = (state) => {
 const { email } = state.auth;
  return ({
    email
  });
};

export default connect(mapStateToProps, {})(Chart);
