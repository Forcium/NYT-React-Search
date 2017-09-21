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
