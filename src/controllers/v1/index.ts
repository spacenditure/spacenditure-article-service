/**
 * @file Creates a Class App that will initialize middleware, database, and controllers.
 * @this App
 * @exports App
 * 
 * @author Navneet Lal Gupta
 */


import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import Controller from '../../interfaces/controller.interface';
import errorMiddleware from '../../middleware/error.middleware';

import ArticleController from './article/article.controller';

class Version1_API {
  public app: express.Application;
  private readonly controllers: Controller[]

  /**
   * 
   * @constructor
   * @param controllers 
   * @param port 
   */
  constructor() {
    this.app = express();
    this.controllers = [
      new ArticleController()
    ]

    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorhandling();
  }

  /**
   * @func initializeMiddlewares Initializes all the middleware
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  /**
   * @func initializeErrorhandling Initializes error handling middleware.
   */
  private initializeErrorhandling(){
    this.app.use(errorMiddleware);
  }

  /**
   * @func initializeControllers Initializes controller.
   * @param controllers 
   */
  private initializeControllers() {
    this.controllers.forEach(controller => {
      this.app.use('/v1', controller.router);
    });
  }
}

export default Version1_API;