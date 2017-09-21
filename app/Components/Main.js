var React = require('react');

var axios = require('axios') ;

var moment = require('moment');
moment().format("MMM Do YY"); 

//Children
var Query = require ('./Children/Query.js');
var Results = require('./Children/Results.js');
var Saved = require('./Children/Saved.js');

//helpers
var helpers = require('./utils/helpers.js');

//------------------------------------------------------

//Main
var Main = React.createClass({

  //set state
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: "",
      results: [],
      savedArticles: []
    }
  },

  //children updating parent based on search Terms
  setTerm: function(articleTopic, articleStartYear, articleEndYear){
    this.setState({
      topic: articleTopic,
      startYear: articleStartYear,
      endYear: articleEndYear
    })
  },

  saveArticle: function(title, date, url){
    helpers.postArticle(title, date, url);
    this.getArticle();
  },

  deleteArticle: function(article){
    axios.delete('/api/saved/' + article._id)
      .then(function(response){
        this.setState({savedArticles: response.data});
        return response;
      }.bind(this));
    this.getArticle();
  },

  getArticle: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({savedArticles: response.data});
			}.bind(this));
	},

  // if component is updated, run this
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("component has been updated");

			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},

  componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

  //render function
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="jumbotron" style={{'background-color': '#D9EDF7', 'color': 'gray'}}>
            <h1 className="text-center fa fa-newspaper-o">NY Times Search</h1>
            <h4 className="text-center fa fa-newspaper-o">Powered by React.js</h4>
          </div>
        </div>

        {/* where user will enter search fields */}
        <div className="row">
          <Query setTerm={this.setTerm}/>
        </div>

        {/* results returned from NYT api */}
        <div className="row">
          <Results results={this.state.results} saveArticle={this.saveArticle}/>
        </div>

        {/* user's saved articles */}
        <div className="row">
          <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
        </div>

      </div>
    )
  }
});

module.exports = Main;
