import { IBankAccountData } from '../../../../domain/entities/bank-account/bank-account-data';
import { right } from '../../../../either';
import { ICreateAccount } from '../../../../usecases/create-bank-account/protocols/create-account';
import { CreateAccountResponse } from '../../../../usecases/create-bank-account/protocols/create-account-response';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { IHttpRequest } from '../../ports/http';
import { CreateBankAccountController } from './create-bank-account-controller';

const makeFakeBankAccountData = (): IBankAccountData => ({
  accountNumber: 123,
  agencyNumber: 123,
  representativeCpf: 123,
  balance: 0,
  openingDate: new Date(),
  representativeName: 'any_name',
  representativeEmail: 'any_email@mail.com',
  representativeBirthdate: new Date(),
  representativeAddress: 'any_address',
  representativePhoneNumber: 123,
});

const makeFakeBankAccountRequest = (): IHttpRequest => ({
  body: {
    accountNumber: 123,
    agencyNumber: 123,
    representativeCpf: 123,
    representativeName: 'any_name',
    representativeEmail: 'any_email@mail.com',
    representativeBirthdate: new Date(),
    representativeAddress: 'any_address',
    representativePhoneNumber: 123,
  },
});

const makeCreateBankAccount = (): ICreateAccount => {
  class CreateBankAccountStub implements ICreateAccount {
    async createBankAccount(
      bankAccount: IBankAccountData
    ): Promise<CreateAccountResponse> {
      return Promise.resolve(right(bankAccount));
    }
  }
  return new CreateBankAccountStub();
};

interface ISutTypes {
  sut: CreateBankAccountController;
  createBankAccountStub: ICreateAccount;
}

const makeSut = (): ISutTypes => {
  const createBankAccountStub = makeCreateBankAccount();
  const sut = new CreateBankAccountController(createBankAccountStub);
  return {
    sut,
    createBankAccountStub,
  };
};

describe('Create bank account controller', () => {
  test('Should return 400 if account number is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        agencyNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('accountNumber'))
    );
  });

  test('Should return 400 if agency number is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('agencyNumber'))
    );
  });

  test('Should return 400 if representative cpf is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativeCpf'))
    );
  });

  test('Should return 400 if representative name is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeCpf: 123,
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativeName'))
    );
  });

  test('Should return 400 if representative email is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativeEmail'))
    );
  });

  test('Should return 400 if representative birthdate is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeAddress: 'any_address',
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativeBirthdate'))
    );
  });

  test('Should return 400 if representative address is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativePhoneNumber: 123,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativeAddress'))
    );
  });

  test('Should return 400 if representative phone number is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        accountNumber: 123,
        agencyNumber: 123,
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('representativePhoneNumber'))
    );
  });

  test('Should return 500 if CreateBankAccount throws', async () => {
    const { sut, createBankAccountStub } = makeSut();
    jest
      .spyOn(createBankAccountStub, 'createBankAccount')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const httpResponse = await sut.handle(makeFakeBankAccountRequest());
    expect(httpResponse).toEqual(serverError());
  });

  test('Should return 200 and bank account data on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeBankAccountRequest());
    expect(httpResponse).toEqual(ok(makeFakeBankAccountData()));
  });
});
