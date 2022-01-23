/* eslint-disable no-restricted-syntax */
import { IUpdateAccountData } from '../../../../usecases/update-bank-account-data/protocols/update-account-data';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class UpdateBankAccountDataController implements IController {
  private readonly updateBankAccountData: IUpdateAccountData;

  constructor(updateBankAccountData: IUpdateAccountData) {
    this.updateBankAccountData = updateBankAccountData;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['representativeCpf'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    try {
      await this.updateBankAccountData.updateBankAccountData(
        httpRequest.body.representativeCpf,
        httpRequest.body.newRepresentativeEmail,
        httpRequest.body.newRepresentativeAddress,
        httpRequest.body.newRepresentativePhoneNumber
      );
      return ok('Successfully updated data');
    } catch (error) {
      return badRequest(new Error('An error has occurred while updating data'));
    }
  }
}
