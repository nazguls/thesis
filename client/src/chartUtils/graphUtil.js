import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
   scale,
   shape
};

function createScaleX(start, end, width) {
  return d3.scale.scaleTime()
    .domain([start, end])
    .range([0, width]);
}

function createScaleY(minY, maxY, height) {
  return d3.scale.scaleLinear()
    .domain([minY, maxY]).nice()
    .range([height, 0]);
}

export function createLineGraph({
  data, xAccessor, yAccessor, width, height,
}) {
  const lastDatum = data[data.length - 1];
  const scaleX = createScaleX(data[0].date, lastDatum.date, width);

  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);

const extentY = d3Array.extent(allYValues);
const scaleY = createScaleY(extentY[0], extentY[1], height);


const lineShape = d3.shape.line().x(d => scaleX(xAccessor(d))).y(d => scaleY(yAccessor(d)));

return {
  data,
  scale: {
    x: scaleX,
    y: scaleY,
  },
  path: lineShape(data),
  ticks: data.map((datum) => {
    const time = xAccessor(datum);
    const value = yAccessor(datum);

    return {
      x: scaleX(time),
      y: scaleY(value),
      datum,
    };
   }),
 };
}

