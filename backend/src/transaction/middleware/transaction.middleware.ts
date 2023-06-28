import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Type } from '../dto/transaction-create.dto';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    if (req.body.amount >= 10000 && req.body.type === Type.DEPOSIT)
      console.log('##### depósito de más de 10,000 US$ ####')

    next();
  }
}
