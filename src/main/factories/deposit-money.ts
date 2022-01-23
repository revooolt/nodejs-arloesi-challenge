import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { DepositMoneyController } from '../../presentation/controllers/bank-account/deposit-money/deposit-money-controller';
import { DepositMoney } from '../../usecases/deposit-money/deposit-money';

export const makeDepositMoneyController = (): DepositMoneyController => {
  const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
  const depositMoneyUseCase = new DepositMoney(bankAccountTypeORMRepository);
  return new DepositMoneyController(depositMoneyUseCase);
};
