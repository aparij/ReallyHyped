import React from 'react';
//import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'lodash';
import qs from 'qs';

let propTypes = {
  location: React.PropTypes.object.isRequired,
  tags: React.PropTypes.array.isRequired
};

export default class SelectionTags extends React.Component {

  constructor(props) {
     super(props);
    //  this.state = {chipData: [
    //    {key: 0, label: 'Angular'},
    //    {key: 1, label: 'JQuery'},
    //    {key: 2, label: 'Polymer'},
    //    {key: 3, label: 'ReactJS'},
    //  ]};
     this.styles = {
       chip: {
         margin: 4,
       },
       wrapper: {
         display: 'flex',
         flexWrap: 'wrap',
       },
     };
   }

   componentWillMount(){
     console.log(this.props)
   }

   componentWillReceiveProps(nextProps){

   }

   handleRequestClose() {
    console.log("request close");
  }

   handleRequestDelete = (keyword) => {
     let oldQuery = this.props.location.search;
     oldQuery = qs.parse(oldQuery.substring(1)).split(",");
     //let payload = [key]
     let payload = oldQuery.filter(item => item===keyword)
     let newQueryPayload = { "keywords": payload.join() };
     let path = this.props.location.pathname;
     this.props.history.push("?"+qs.stringify(newQueryPayload,{ encode: true }));



    //  this.chipData = this.state.chipData;
    //  const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    //  this.chipData.splice(chipToDelete, 1);
    //  this.setState({chipData: this.chipData});
   };

   renderChip(data,index) {
     return (
       <Chip
         key={index}
         onRequestDelete={() => this.handleRequestDelete(data)}
          onTouchTap={this.handleRequestClose.bind(this)}
         style={this.styles.chip}
       >
         {data}
       </Chip>
     );
   }

   render() {
     if(_.isEmpty(this.props.tags)){
       return null;
     }

     return (
       <div style={this.styles.wrapper}>
         {this.props.tags.map(this.renderChip, this)}
       </div>
     );
   }

}


SelectionTags.propTypes = propTypes;
