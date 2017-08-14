import React from 'react';

import qs from 'qs';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class RankingsTable  extends React.Component {
   state = {
  };

 componentWillMount() {
   let changesMap = {}
   console.log(this.props.tags);
   //iterate over each date
/*   for (var i = 0; i < changesData.length; i++) {
     var obj = changesData[i];
   }*/
 }

  render(){
    return (
      <div className="rankings">
        <div className="rankings-tables-container">
          <div className="changes-table">

          <Table onRowSelection={(v)=>this.rowSelected(v)}>
            {this.renderTableHeader()}
           <TableBody displayRowCheckbox={false} stripedRows={false}>
              {this.renderRows()}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    )
  }

  renderTableHeader(){
    return (
      <TableHeader displaySelectAll ={false}>
        <TableRow className="table-row">
          <TableHeaderColumn className="table-column table-column__rank">RANK</TableHeaderColumn>
          <TableHeaderColumn className="table-column" >TECH</TableHeaderColumn>
          <TableHeaderColumn className="table-column">% OF POSTINGS</TableHeaderColumn>

        </TableRow>
      </TableHeader>
    )
  }

  renderRows(){
    let rows = this.props.tags.map(v=>
      <TableRow key={"row-"+v.rank} className="table-row">
        <TableRowColumn className="table-column table-column__rank table-pointer" key={v.tag}>{v.rank}</TableRowColumn>
        <TableRowColumn className="table-column table-pointer" key={v.tag}>{v.tag}</TableRowColumn>
        <TableRowColumn className="table-column table-pointer" key={v.tag}> {v.perc} %</TableRowColumn>
      </TableRow>
    )
    return (rows);
  }

  rowSelected = (rowIndex) => {
    if(!_.isEmpty(rowIndex)){
      this.applyQuery(this.props.tags[rowIndex[0]].tag);
    }
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

export default RankingsTable;