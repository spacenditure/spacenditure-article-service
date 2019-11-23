/**
 * @interface
 * @description Defines a interface on controller.
 * @exports Controller
 */

import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;
}

export default Controller;