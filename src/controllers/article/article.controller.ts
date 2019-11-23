/**
 * @file Creates a Class ArticleController that will initialize all the routes.
 * @this ArticleController
 * @exports ArticleController
 * 
 * @author Navneet Lal Gupta
 */

import express from 'express';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from './article.interface';
import articleModel from './article.model';
import HttpException from '../../exceptions/HttpException';

class ArticleController {
  public path = '/article';
  public router = express.Router();

  /**
   * @constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllArticles);
    this.router.get(`${this.path}/:id`, this.getArticleById);
    this.router.post(this.path, this.createArticle);
    this.router.put(`${this.path}/:id`, this.updateArticle);
    this.router.delete(`${this.path}/:id`, this.deleteArticle);
  }

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  getAllArticles = (request: Request, response: Response, next: NextFunction) => {
    let perPage = 10;
    let page = 0;
    if(parseInt(request.query.page)) page = parseInt(request.query.page)
    if(parseInt(request.query.perPage)) perPage = parseInt(request.query.perPage)
    console.log(parseInt(request.query.page), parseInt(request.query.perPage))
    articleModel
      .find()
      .limit(perPage)
      .skip(perPage * page)
      .then(article => {
        if (article) {
          articleModel.countDocuments()
            .then(numberOfDocuments => {
              response.status(200).send({
                page,
                results: article,
                total_pages: Math.floor(numberOfDocuments / perPage) + 1,
                total_results: numberOfDocuments
              })
            })
        }
        else next(new HttpException(404, 'No article found'))
      })
  }

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  getArticleById = (request: Request, response: Response, next: NextFunction) => {
    const id = new mongoose.Types.ObjectId(request.params.id);
    articleModel
      .findById(id)
      .then(article => {
        if (article) response.status(200).send(article)
        else next(new HttpException(404, 'Article not found'))
      })
  }

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  createArticle = (request: Request, response: Response, next: NextFunction) => {
    const article: Article = request.body;
    articleModel
      .create(article)
      .then(res => {
        if (res) response.status(201).send(res)
        else next(new HttpException(500, 'Internal server error'))
      })
  }

  updateArticle = (request: Request, response: Response, next: NextFunction) => {
    const article: Article = request.body;
    const articleId = new mongoose.Types.ObjectId(request.params.id);
    articleModel
      .replaceOne({ _id: articleId }, article)
      .then(res => {
        if(res.nModified) response.status(204).send()
        else next(new HttpException(404, 'No matching article found'))
      })
      .catch(() => next(new HttpException(500, 'Internal server error')))
  }

  deleteArticle = (request: Request, response: Response, next: NextFunction) => {
    const articleId = new mongoose.Types.ObjectId(request.params.id);
    articleModel
      .deleteOne({ _id: articleId })
      .then(res => {
        if(res.ok && res.n) response.status(200).send()
        else next(new HttpException(404, 'No matching article found'))
      })
      .catch(() => next(new HttpException(500, 'Internal server error')))
  }
}

export default ArticleController;
