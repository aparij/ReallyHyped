import React from 'react';

import qs from 'qs';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import changesData from '../data/top_changes.json';

const style = {
  margin: 12,
};

class TopChanges  extends React.Component {
   state = {
    btnSelection: "top25",
  };

 componentWillMount() {
   let changesMap = {}
   //iterate over each date
   console.log(changesData.top25.best);
   for (var i = 0; i < changesData.length; i++) {
     var obj = changesData[i];
     console.log(obj);
   }
 }

  render(){
    return (
      <div className="changes">
          What tech is rising or falling fastest from:
        <RaisedButton  key="top25" label="Top 25" primary={true} style={style} onClick={() => this.clickHandler("top25")}/>
        <RaisedButton  key="top50" label="Top 50" primary={true} style={style} onClick={() => this.clickHandler("top50")}/>
        <RaisedButton  key="topALL" label="All" primary={true} style={style} onClick={() => this.clickHandler("topALL")}/>
        <div className="changes-tables-container">
          <div className="changes-table">

          <Table onRowSelection={(v)=>this.rowSelected(v,"best")}>
            {this.renderTableHeader("BEST")}
           <TableBody displayRowCheckbox={false} stripedRows={false}>
              {this.renderRows("best")}
            </TableBody>
          </Table>
          </div>

          <div className="changes-table">


           <Table onRowSelection={(v)=>this.rowSelected(v,"worst")}>
             {this.renderTableHeader("WORST")}
              <TableBody displayRowCheckbox={false} stripedRows={false}>
                {this.renderRows("worst")}
              </TableBody>
            </Table>
            </div>

          </div>

      </div>
    )
  }

  renderTableHeader(type){
    return (
      <TableHeader displaySelectAll ={false}>
        <TableRow>
          <TableHeaderColumn colSpan="3"  style={{textAlign: 'center'}}>
            {type} PERFORMERS
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Tech</TableHeaderColumn>
          <TableHeaderColumn>Y/Y Change</TableHeaderColumn>
          <TableHeaderColumn>Rank</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  renderRows(type){
    let rows = changesData[this.state.btnSelection][type].map(v=>
      <TableRow key={"row-"+v.tag}>
        <TableRowColumn key={v.tag}>{v.tag}</TableRowColumn>
        <TableRowColumn key={v.tag}> {v.change} %</TableRowColumn>
        <TableRowColumn key={v.tag}>{v.rank}</TableRowColumn>
      </TableRow>
    )
    return (rows);
  }

  rowSelected = (rowIndex,type) => {
    console.log(changesData[this.state.btnSelection][type][rowIndex[0]]);
    if(!_.isEmpty(rowIndex)){
      this.applyQuery(changesData[this.state.btnSelection][type][rowIndex[0]].tag);
    }
  };

  clickHandler = (value) => {
    console.log(value);
    this.setState({
      btnSelection: value
    });
  };

  applyQuery = (selection) =>{
    let oldQuery = this.props.location.search;
    oldQuery = qs.parse(oldQuery.substring(1));
    let payload = [selection]
    if(!_.isEmpty(oldQuery.keywords)){
      payload = _.union([payload,oldQuery.keywords]);
    }
    let newQueryPayload = { "keywords": payload.join() };
    this.props.history.push("?"+qs.stringify(newQueryPayload,{ encode: true }));
    this.setState({value: ""});
  }

}

export default TopChanges;