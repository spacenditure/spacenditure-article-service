/***
 * @author Navneet Lal  Gupta
 * @description This is entry point of the application.
 * 
 */

import 'dotenv/config';
import App from './controllers';

const app = new App(
  5000,
);
 
app.listen();