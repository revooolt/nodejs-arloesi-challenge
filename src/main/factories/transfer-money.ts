import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { TransferMoneyController } from '../../presentation/controllers/bank-account/transfer-money/transfer-money-controller';
import { TransferMoney } from '../../usecases/transfer-money/transfer-money';

export const makeTransferMoneyController = (): TransferMoneyController => {
  const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
  const transferMoneyUseCase = new TransferMoney(bankAccountTypeORMRepository);
  return new TransferMoneyController(transferMoneyUseCase);
};
