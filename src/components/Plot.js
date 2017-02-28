/* global Plotly */
import React from 'react';

class Plot extends React.Component {
  componentDidMount() {
    Plotly.newPlot('plot', [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type
    }], {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
  }

  render() {
    return (
      <div id="plot"></div>
    );
  }
}

export default Plot;