//React
var React = require('react');


//Component
var Results = React.createClass({

  getInitialState: function(){
    return {
      title:"",
      date:"",
      url:"",
      results: []
    }
  },

  //user clicks save article
  clickToSave: function(result){
    this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
  },

  componentWillReceiveProps: function(nextProps){
    var savedProp = this;

    var savedResults = nextProps.results.map(function(search, i){
      var clickBound = savedProp.clickToSave.bind(savedProp, search);
      return <div className="list-group-item" key={i}>
        <a href={search.web_url} target="_blank">{search.headline.main}</a>
        <br />
        {search.pub_date}
        <br />
        <button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-40px'}} onClick={clickBound}>Save Article</button>
      </div>
    });

    this.setState({results: savedResults});
  },
  //render function
  render: function(){
    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title text-center" style={{'color': 'gray'}}>Search Results</h3>
        </div>
        <div className="panel-body">
          {this.state.results}
        </div>
      </div>
    )
  }
});


module.exports = Results;
