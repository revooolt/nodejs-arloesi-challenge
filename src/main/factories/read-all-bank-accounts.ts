import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { ReadAllBankAccountsController } from '../../presentation/controllers/bank-account/read-all-bank-accounts/read-all-bank-accounts-controller';
import { ReadAllBankAccounts } from '../../usecases/read-all-bank-accounts/read-all-bank-accounts';

export const makeReadAllBankAccountsController =
  (): ReadAllBankAccountsController => {
    const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
    const readAllBankAccountsUseCase = new ReadAllBankAccounts(
      bankAccountTypeORMRepository
    );
    return new ReadAllBankAccountsController(readAllBankAccountsUseCase);
  };
