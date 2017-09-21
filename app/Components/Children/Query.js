//React
var React = require ('react');

//Component
var Query = React.createClass({
  //set a state associated with the search field
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: ""
    }
  },

  //responding to user input
  handleChange: function(event){
    //syntax for new variable accomodating changes in text field
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },
  //when user hits search button
  handleClick: function(){

    //give parent the search term
    this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
  },

  //function render
  render: function(){
    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={{'color': 'gray'}}>Search</h2>
        </div>
        <div className="panel-body text-center">

          <form>
            <div className="form-group">
              <h4 className="">Topic</h4>
              <input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
              <br />

              <h4 className="">Start Year</h4>
              <input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
              <br />

              <h4 className="">End Year</h4>
              <input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
              <br />

              <button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
            </div>
          </form>

        </div>
      </div>
    )
  }
});


module.exports = Query;
