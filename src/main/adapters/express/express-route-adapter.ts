import { Request, Response } from 'express';

import { IController } from '../../../presentation/controllers/ports/controller';
import { IHttpRequest } from '../../../presentation/controllers/ports/http';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
      params: request.params,
    };

    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
