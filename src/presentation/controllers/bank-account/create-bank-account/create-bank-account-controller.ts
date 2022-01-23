/* eslint-disable no-restricted-syntax */
import { IBankAccountData } from '../../../../domain/entities/bank-account/bank-account-data';
import { ICreateAccount } from '../../../../usecases/create-bank-account/protocols/create-account';
import { CreateAccountResponse } from '../../../../usecases/create-bank-account/protocols/create-account-response';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class CreateBankAccountController implements IController {
  private readonly createAccount: ICreateAccount;

  constructor(createAccount: ICreateAccount) {
    this.createAccount = createAccount;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = [
        'accountNumber',
        'agencyNumber',
        'representativeCpf',
        'representativeName',
        'representativeEmail',
        'representativeBirthdate',
        'representativeAddress',
        'representativePhoneNumber',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const bankAccountData: IBankAccountData = {
        accountNumber: httpRequest.body.accountNumber,
        agencyNumber: httpRequest.body.agencyNumber,
        balance: 0,
        openingDate: new Date(),
        representativeCpf: httpRequest.body.representativeCpf,
        representativeName: httpRequest.body.representativeName,
        representativeEmail: httpRequest.body.representativeEmail,
        representativeBirthdate: httpRequest.body.representativeBirthdate,
        representativeAddress: httpRequest.body.representativeAddress,
        representativePhoneNumber: httpRequest.body.representativePhoneNumber,
      };
      const createBankAccountResponse: CreateAccountResponse =
        await this.createAccount.createBankAccount(bankAccountData);

      if (createBankAccountResponse.isLeft()) {
        return badRequest(createBankAccountResponse.value);
      }
      return ok(bankAccountData);
    } catch (error) {
      return serverError();
    }
  }
}
