import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).send({ error: 'No token provided' });
    }

    // try {
    //   const httpResponse = await this.httpService.axiosRef.post(
    //     `${process.env.AUTHENTICATION_SERVICE_URL}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     },
    //   );

    // console.log(httpResponse);

    // const { userId } = httpResponse.data;

    const userId = 123;

    if (!userId) {
      return response.status(401).send({ error: 'Invalid token' });
    }

    request['userId'] = userId;

    next();
  }
}
