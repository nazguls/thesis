import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions } from 'react-native';
import * as makeChart from '../../chartUtils/graphUtil.js';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import axios from 'axios';

const d3 = {
  scale,
  shape,
};
const { Surface, Group, Shape, } = ART;

const dimensionsWindow = Dimensions.get('window');

const xAccessor = (d) => { return d.date; };

const yAccessor = (d) => { return d.value; };

class Chart extends Component {

  constructor(props) {
		super(props);


     this.state = { lineGraph: '' };
    }


    componentWillMount() {

      axios.get('http://localhost:3000/api/portfolio/' + 'isaac1?period=historical').then(response => {
        let data = response.data.map(dataObj => {
          return {
            date: new Date(dataObj.date),
            value: dataObj.portfolioValue
          };
        });
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: 300, height: 200 });
        this.setState({ lineGraph: line.path }, () => {
        });
      });

        // console.log('46', response));


    }

    //this.state = {lineGraph: ''};
  render() {

    return (
      <View style={{backgroundColor: 'transparent'}}>
       <Surface width={500} height={200}>
       <Group x={100} y={0}>
       <Shape
          d={this.state.lineGraph}
          stroke="orange"
          strokeWidth={3} />
         </Group>
        </Surface>
      </View>
    )
  }
};


export default Chart;