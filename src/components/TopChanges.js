import React from 'react';
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

class RaisedButtonExampleSimple  extends React.Component {
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
        <RaisedButton  label="Top 25" primary={true} style={style} onClick={() => this.clickHandler("top25")}/>
        <RaisedButton  label="Top 50" primary={true} style={style} onClick={() => this.clickHandler("top50")}/>
        <RaisedButton  label="All" primary={true} style={style} onClick={() => this.clickHandler("topALL")}/>
        <div className="changes-tables-container">
          <div className="changes-table">

          <Table>
            {this.renderTableHeader("BEST")}
           <TableBody displayRowCheckbox={false} stripedRows={false}>
              {this.renderRows("best")}
            </TableBody>
          </Table>
          </div>

          <div className="changes-table">


           <Table>
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
          <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
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
      <TableRow>
        <TableRowColumn>{v.tag}</TableRowColumn>
        <TableRowColumn>{v.change} %</TableRowColumn>
        <TableRowColumn>{v.rank}</TableRowColumn>
      </TableRow>
    )
    return (rows);
  }
  clickHandler = (value) => {
    console.log(value);
    this.setState({
      btnSelection: value
    });
  };

}

export default RaisedButtonExampleSimple;