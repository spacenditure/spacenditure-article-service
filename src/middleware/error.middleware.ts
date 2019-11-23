/**
 * @description Error handler middleware, sends error response to client.
 * @exports errorMiddleware
 */

import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message
    })
}

export default errorMiddleware;