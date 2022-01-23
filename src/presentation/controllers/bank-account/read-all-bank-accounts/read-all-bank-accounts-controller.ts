import { IReadAllAccounts } from '../../../../usecases/read-all-bank-accounts/protocols/read-all-accounts';
import { ok } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpResponse } from '../../ports/http';

export class ReadAllBankAccountsController implements IController {
  private readonly readAllBankAccounts: IReadAllAccounts;

  constructor(readAllBankAccounts: IReadAllAccounts) {
    this.readAllBankAccounts = readAllBankAccounts;
  }

  async handle(): Promise<IHttpResponse> {
    const bankAccounts = await this.readAllBankAccounts.readAllBankAccounts();
    return ok(bankAccounts);
  }
}
