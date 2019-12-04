/***
 * @author Navneet Lal  Gupta
 * @description This is entry point of the application.
 * 
 */

import 'dotenv/config';
import Version1_API from './v1';
import express from 'express';
import mongoose from 'mongoose';

class App {
  public app: express.Application
  private readonly Apis: Version1_API[]
  public port: number

  constructor(port: number){
    this.port = port;
    this.app = express();
    this.Apis = [
      new Version1_API()
    ]
    this.initializeApis(this.Apis);
    this.connectToTheDatabase()
  }

  private initializeApis(apis: Version1_API[]) {
    apis.forEach(api => {
      this.app.use('/', api.app)
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

  public listen() {
    this.app.listen(this.port, () => console.log("Started server at port ", this.port))
  }
}

export default App;
