/* eslint-disable no-restricted-syntax */
import { IDeleteBankAccount } from '../../../../usecases/delete-bank-account/protocols/delete-account';
import { noContentSuccess, serverError } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class DeleteBankAccountController implements IController {
  private readonly deleteBankAccount: IDeleteBankAccount;

  constructor(deleteBankAccount: IDeleteBankAccount) {
    this.deleteBankAccount = deleteBankAccount;
  }

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    try {
      await this.deleteBankAccount.deleteBankAccount(params.representativeCpf);
      return noContentSuccess();
    } catch (error) {
      return serverError();
    }
  }
}
