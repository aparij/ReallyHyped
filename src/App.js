import React, { Component } from 'react';
import _ from 'lodash';
//import logo from './logo.svg';
import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot'
class App extends Component {
  state = {
      data: {},
        };

  componentWillMount(){

    let tagMap = {}
    //iterate over each date
    for(var i = 0; i < tagData.length; i++) {
      var obj = tagData[i];
      //iterate over all the tags on one date
      for (var j = 0; j < obj.tags.length; j++) {
        let chartTagObj = tagMap[tag.tag];
        const tag = obj.tags[j];
        if(_.has(tagMap,tag.tag)){
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }else{
          let chartTagObj = {x:[],y:[],type: 'scatter'};
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }
      }

    }

  let data=[tagMap['java'],tagMap['python'],tagMap['javascript'],tagMap['reactjs']]

  this.setState({data});

  //
  // var trace1 = {
  //   x: [1, 2, 3, 4],
  //   y: [10, 15, 13, 17],
  //   mode: 'markers'
  // };
  //
  // var trace2 = {
  //   x: [2, 3, 4, 5],
  //   y: [16, 5, 11, 10],
  //   mode: 'lines'
  // };
  //
  // var trace3 = {
  //   x: [1, 2, 3, 4],
  //   y: [12, 9, 15, 12],
  //   mode: 'lines+markers'
  // };
  //
  // var data = [ trace1, trace2, trace3 ];
  //
  //   this.setState({data})

  }
  render() {

    return (
      <div className="App">
        <div className="App-header">
            <Plot
            data={this.state.data}
            />
        </div>
      </div>
    );
  }
}

export default App;
