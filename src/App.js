import React, { Component } from 'react';
import _ from 'lodash';
import Grid from 'material-ui/Grid';

//import tagData from './data/data.json';
import './App.css';
import Plot from './components/Plot';

import RankingsTable from './components/RankingsTable';
import Suggest from './components/Suggest';
import SelectionTags from './components/SelectionTags';
import TopChanges from './components/TopChanges';
import qs from 'qs';


class App extends Component {
  state = {
      data: {},
      top20Data: []
  };

  componentWillMount(){
    if(this.props.location.search && this.getKeywordsFromQS(this.props.location.search)!=="" ){

      this.fetchTagsData(this.props.location.search);
    }
    //fetch top20
    this.fetchTagsData();
    //fetch suggestionv values
    this.fetchSuggestions();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search && this.getKeywordsFromQS(nextProps.location.search)!=="" ){
      this.fetchTagsData(nextProps.location.search);
    }else{
      this.setState({data:{}});
    } 
  }

  fetchTagsData(query=''){
    
    var myInit = { method: 'GET',
                   //headers: {'Access-Control-Allow-Origin': '*'},
                   //mode: 'cors',
                   cache: 'default' };

    fetch('http://localhost:3001/tags' + query) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => {
      return resp.json();
    }).then((data) => { 
      if(query){
        this.setState({data:data.data});
      }else{
        this.setState({top20Data:data.data});
      }
    }).catch(function(err) {
        console.log('ERROR',err);
    });    
  }

  fetchSuggestions(){
    
    var myInit = { method: 'GET',
                   //headers: {'Access-Control-Allow-Origin': '*'},
                   //mode: 'cors',
                   cache: 'default' };

    fetch('http://localhost:3001/suggestions') // Call the fetch function passing the url of the API as a parameter
    .then((resp) => {
      return resp.json();
    }).then((data) => { 
        this.setState({suggestionsData:data.data});
    }).catch(function(err) {
        console.log('ERROR',err);
    });    
  }
  
  getKeywordsFromQS(query){
    if(query===""){
      return "";
    }

    const parsedQS = qs.parse(query.substring(1));
    return parsedQS.keywords;
  }

  render() {

    let chartData = []
    console.log(this.state.data)
    for(let tag of Object.keys(this.state.data)){
      
      console.log('file:App.js , line:110',tag);
      if(this.state.data[tag]){
        let chartTagObj = {x:[],y:[],type: 'scatter',name: tag};
        for(let dataPoint of this.state.data[tag]){
          chartTagObj.x.push(dataPoint.dateScraped);
          chartTagObj.y.push(dataPoint.perc);
        }
        chartData.push(chartTagObj)

      }


    }

    return (
      <div className="App">
        <h1>StackOverflow Careers Tech Trends</h1>

        <h3>
          The data provided was retrieved from - <a target="_blank" href="https://stackoverflow.com/jobs"> StackOverflow Careers</a><br/>
        </h3>



        <p>
          The data is only for the limited five tags that employers select to show the main technologies.
          It doesn't include the endless "nice to have" list of buzz words that many job posts uncesssary add.
         </p>
        <div className="App-header">
              <Grid container spacing={24}  >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <RankingsTable
                      tags={this.state.top20Data}
                      history={this.props.history}
                      location={this.props.location}
                    />
                 </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="top-left-container">
                    <Suggest
                      tags={this.state.suggestionsData}
                      history={this.props.history}
                      location={this.props.location}
                    />
                    <SelectionTags
                      tags={Object.keys(this.state.data)}
                      history={this.props.history}
                      location={this.props.location}
                    />
                    <Plot
                    data={chartData}
                    history={this.props.history}
                    location={this.props.location}
                    />
                  </div>
                </Grid>
              </Grid>
          </div>
        <TopChanges
           history={this.props.history}
           location={this.props.location}
        />
        <div className="footer">
          <div className="footer-element">Follow <a target="_blank" href="https://twitter.com/alex_parij">@aparij</a> </div>   
          <div className="footer-element">Open source on <a target="_blank" href="https://github.com/aparij/ThrillIsGoneLab">Github</a> </div>
          <div className="footer-element">Original data <a target="_blank" href="https://github.com/aparij/soCareers-Data">Github</a> </div>
          <div className="footer-element">Scraping script source <a target="_blank" href="https://github.com/aparij/soCareersScrape">Github</a> </div>
        </div>
      </div>
    );
  }
}

export default App;
