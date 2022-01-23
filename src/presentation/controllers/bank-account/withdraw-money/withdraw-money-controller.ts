/* eslint-disable no-restricted-syntax */
import { IWithdraw } from '../../../../usecases/withdraw-money/protocols/withdraw';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class WithdrawMoneyController implements IController {
  private readonly withdrawMoney: IWithdraw;

  constructor(withdrawMoney: IWithdraw) {
    this.withdrawMoney = withdrawMoney;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['representativeCpf', 'amount'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    try {
      await this.withdrawMoney.withdrawMoney(
        httpRequest.body.representativeCpf,
        httpRequest.body.amount
      );
      return ok('Successfully withdrawn');
    } catch (error) {
      return badRequest(
        new Error('An error has occurred while withdrawing the money')
      );
    }
  }
}
