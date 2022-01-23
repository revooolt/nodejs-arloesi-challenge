/* eslint-disable no-restricted-syntax */
import { IDeposit } from '../../../../usecases/deposit-money/protocols/deposit';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class DepositMoneyController implements IController {
  private readonly depositMoney: IDeposit;

  constructor(depositMoney: IDeposit) {
    this.depositMoney = depositMoney;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['representativeCpf', 'amount'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    try {
      await this.depositMoney.depositMoney(
        httpRequest.body.representativeCpf,
        httpRequest.body.amount
      );
      return ok('Successfully deposited');
    } catch (error) {
      return badRequest(
        new Error('An error has occurred while depositing the money')
      );
    }
  }
}
