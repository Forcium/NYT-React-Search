// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },

  url: {
    type: String,
    required: true,
    unique: true
  }
});

// Create model
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
