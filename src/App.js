import React, { Component } from 'react';
import _ from 'lodash';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
//import logo from './logo.svg';
import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';
import Suggest from './components/Suggest';
import SelectionTags from './components/SelectionTags';
import qs from 'qs';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  state = {
      data: {},
  };

  componentWillMount(){
    console.log(this.props.location.search);
    let tagMap = {}
    //iterate over each date
    for(var i = 0; i < tagData.length; i++) {
      var obj = tagData[i];
      //iterate over all the tags on one date
      for (var j = 0; j < obj.tags.length; j++) {
        const tag = obj.tags[j];
        if(_.has(tagMap,tag.tag)){
          let chartTagObj = tagMap[tag.tag];
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }else{
          let chartTagObj = {x:[],y:[],type: 'scatter',name: tag.tag};
          chartTagObj.x.push(obj.date);
          chartTagObj.y.push(tag.perc);
          tagMap[tag.tag] = chartTagObj;
        }
      }
    }
    let kws = this.getKeywordsFromQS(this.props.location.search);
    console.log(kws);
    let data = []
    if(!_.isEmpty(kws)){
      data = kws.split(",").map(item=>tagMap[item]);
    }
    console.log("componentWillMount in APP.js",data)
    //let data=[tagMap['java'],tagMap['python'],tagMap['javascript'],tagMap['reactjs']]
    this.setState({data,tagMap});
  }

  componentWillReceiveProps(nextProps) {
    console.log("component will receive props",nextProps.location.search)
    let kws = this.getKeywordsFromQS(nextProps.location.search);
    console.log(kws);
    let data = []
    if(!_.isEmpty(kws)){
      data = kws.split(",").map(item=>this.state.tagMap[item]);
    }
    this.setState({data});

}

getKeywordsFromQS(query){
  if(query===""){
    return "";
  }

  const parsedQS = qs.parse(query.substring(1));
  console.log(parsedQS);
  return parsedQS.keywords;
}

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <div className="App-header">
            <Plot
            data={this.state.data}
            history={this.props.history}
            location={this.props.location}
            />
        </div>
        <Suggest
          tags={Object.keys(this.state.tagMap).map(key=> {return {text:key}} )}
          history={this.props.history}
          location={this.props.location}
        />
        <SelectionTags tags={_.pluck(this.state.data, 'name') }/>

      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
