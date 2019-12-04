/**
 * @description Defines the model and schema to used by mongoose.
 * @exports articleModel
 */
import mongoose from 'mongoose';

import Article from './article.interface';

const articleSchema = new mongoose.Schema({
  articleId: String,
  title: String,
  author: {},
  content: String,
  tags: Array,
  timestamp: Date,
  upVotes: Number
})

const articleModel = mongoose.model<Article & mongoose.Document>('Article', articleSchema);

export default articleModel;