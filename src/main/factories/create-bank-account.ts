import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { CreateBankAccountController } from '../../presentation/controllers/bank-account/create-bank-account/create-bank-account-controller';
import { CreateBankAccount } from '../../usecases/create-bank-account/create-bank-account';

export const makeCreateBankAccountController =
  (): CreateBankAccountController => {
    const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
    const createBankAccountUseCase = new CreateBankAccount(
      bankAccountTypeORMRepository
    );
    return new CreateBankAccountController(createBankAccountUseCase);
  };
