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

import mongoose from 'mongoose';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

import swaggerDocument from './swagger/swagger.json';

class App {
  public app: express.Application;
  public port: number;
  public options: SwaggerUiOptions;

  /**
   * 
   * @constructor
   * @param controllers 
   * @param port 
   */
  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
    this.options = {
      isExplorer: true,
      customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css'
    };


    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorhandling();
  }

  /**
   * @func listen Make the server to listen at specified port.
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log( `server started at http://localhost:${this.port}`);
    })
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
  private initializeControllers(controllers: Controller[]) {
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, this.options));
    this.app.get('/', (req, res) => res.send(`Redirect to: <a href="/swagger">${req.headers.host}/swagger<a> for api documentation`))

    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  /**
   * @func connectToTheDatabase Configure the database.
   */
  private connectToTheDatabase(){
    const {
      MONGO_PATH,
      MONGODB_DATABASE
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_PATH}/${MONGODB_DATABASE}`, {
      useNewUrlParser: true
    }).catch(err => console.log('Error connecting: ', err))
  }
}

export default App;