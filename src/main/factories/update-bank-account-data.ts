import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { UpdateBankAccountDataController } from '../../presentation/controllers/bank-account/update-bank-account-data/update-bank-account-data-controller';
import { UpdateBankAccountData } from '../../usecases/update-bank-account-data/update-bank-account-data';

export const makeUpdateBankAccountDataController =
  (): UpdateBankAccountDataController => {
    const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
    const updateBankAccountDataUseCase = new UpdateBankAccountData(
      bankAccountTypeORMRepository
    );
    return new UpdateBankAccountDataController(updateBankAccountDataUseCase);
  };
