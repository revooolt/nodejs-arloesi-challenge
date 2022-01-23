import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { DeleteBankAccountController } from '../../presentation/controllers/bank-account/delete-bank-account/delete-bank-account-controller';
import { DeleteBankAccount } from '../../usecases/delete-bank-account/delete-bank-account';

export const makeDeleteBankAccountController =
  (): DeleteBankAccountController => {
    const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
    const deleteBankAccountUseCase = new DeleteBankAccount(
      bankAccountTypeORMRepository
    );
    return new DeleteBankAccountController(deleteBankAccountUseCase);
  };
