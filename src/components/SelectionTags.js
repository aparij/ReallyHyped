import React from 'react';
//import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';


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

   }

   componentWillReceiveProps(nextProps){

   }
   handleRequestDelete = (key) => {
     if (key === 3) {
       alert('Why would you want to delete React?! :)');
       return;
     }

     this.chipData = this.state.chipData;
     const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
     this.chipData.splice(chipToDelete, 1);
     this.setState({chipData: this.chipData});
   };

   renderChip(data) {
     return (
       <Chip
         key={data.key}
         onRequestDelete={() => this.handleRequestDelete(data.key)}
         style={this.styles.chip}
       >
         {data.label}
       </Chip>
     );
   }

   render() {
     return (
       <div style={this.styles.wrapper}>
         {this.state.chipData.map(this.renderChip, this)}
       </div>
     );
   }

}


SelectionTags.propTypes = propTypes;
