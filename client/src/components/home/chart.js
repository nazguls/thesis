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
console.log('15: ', dimensionsWindow);

const data = [
  {date: new Date(2000, 1, 1), value: 83.24},
  {date: new Date(2000, 1, 2), value: 85.35},
  {date: new Date(2000, 1, 3), value: 98.84},
  {date: new Date(2000, 1, 4), value: 79.92},
  {date: new Date(2000, 1, 5), value: 83.80},
  {date: new Date(2000, 1, 6), value: 88.47},
  {date: new Date(2000, 1, 7), value: 94.47}
];


const xAccessor = function(d) {return d.date}

const yAccessor = function(d) {return d.value}

class Chart extends Component {

  constructor(props) {
		super(props);


     this.state = {lineGraph: ''};
    }


    componentWillMount() {

      axios.get('http://localhost:3000/api/portfolio/' + 'isaac1?period=historical')


      const line = makeChart.createLineGraph({
      data, xAccessor, yAccessor, width: 300, height: 200 });
      this.setState({lineGraph: line.path}, function() {
        console.log('46', line);
      })
    }

    //this.state = {lineGraph: ''};
  render() {
    console.log(this.state.lineGraph);
    return (
      <View>
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