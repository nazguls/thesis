import React, { Component } from 'react';
import { Text, View, Image, ART, Dimensions, StyleSheet, Color } from 'react-native';
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

    this.state = { lineGraph: '', graphMembers: ''};

    }

    componentWillUpdate() {
      var context = this;
      axios.get('http://localhost:3000/api/portfolio/' + 'isaac1?period=historical').then(response => {
        let data = response.data.map(dataObj => {
          return {
            date: new Date(dataObj.date),
            value: dataObj.portfolioValue
          };
        });
        const line = makeChart.createLineGraph({
        data, xAccessor, yAccessor, width: 300, height: 200 });
        context.setState({lineGraph: line.path, graphMembers: line})
        });
       };


  render() {
    // console.log('46', this.state.graphMembers);
    let tickXFormat = this.state.graphMembers.scale.x(null, '%b %d');

    return (
      <View style={{ backgroundColor: 'transparent' }}>
       <Surface width={500} height={200}>
       <Group x={100} y={0}>
       <Shape
          d={this.state.lineGraph}
          stroke="orange"
          strokeWidth={3} />
        <Shape
          d={this.state.lineGraph}
          stroke="white"
          strokeWidth={3} />
         </Group>
        </Surface>
        {this.state.graphMembers !== '' ? (<View key={'ticksX'}>
          {this.state.graphMembers.ticks.map((tick, index) => {
            const tickStyles = {};
            tickStyles.width = 20;
            tickStyles.left = tick.x - (20 / 2);

            return (

              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickXFormat(new Date(tick.datum.time * 1000))}
              </Text>
            );
          })}
        </View> ) : <View></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});


export default Chart;