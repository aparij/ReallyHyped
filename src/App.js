import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from './components/Plot'
class App extends Component {
  render() {


      var data = [
          {
            x: ['2013-01-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [1, 3, 6],
            type: 'scatter'
          }
        ];
    return (
      <div className="App">
        <div className="App-header">
            <Plot
            xData={data[0].x}
            yData={data[0].y}
            type="scatter"


            />
        </div>
      </div>
    );
  }
}

export default App;
