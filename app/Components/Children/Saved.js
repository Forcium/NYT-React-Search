// React
var React = require('react');

// saved component to show a log of saved articles
var Saved = React.createClass({

	getInitialState: function(){
		return {
			savedArticles: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteArticle(result);
	},

	componentWillReceiveProps: function(nextProps){
		var savedProps = this;

		var savedResult = nextProps.savedArticles.map(function(search, i){
			var clickBounds = savedProps.clickToDelete.bind(savedProps, search);
			return <div className="list-group-item" key={i}>
        <a href={search.url} target="_blank">{search.title}</a>
        <br />
        {search.date}
        <br />
        <button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-40px'}} onClick={clickBounds}>Delete</button>
      </div>
		});

		this.setState({savedArticles: savedResult});
	},

	// render function
	render: function(){
		return(
			<div className="panel panel-info">
				<div className="panel-heading">
					<h3 className="panel-title text-center" style={{'color': 'gray'}}>Saved Articles</h3>
				</div>
				<div className="panel-body">
					{this.state.savedArticles}
				</div>
			</div>
		)
	}
});


module.exports = Saved;
