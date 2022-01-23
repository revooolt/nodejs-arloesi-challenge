import { BankAccountTypeORMRepository } from '../../external/database/postgresql/orms/typeorm/repositories/bank-account-repository';
import { WithdrawMoneyController } from '../../presentation/controllers/bank-account/withdraw-money/withdraw-money-controller';
import { WithdrawMoney } from '../../usecases/withdraw-money/withdraw-money';

export const makeWithdrawMoneyController = (): WithdrawMoneyController => {
  const bankAccountTypeORMRepository = new BankAccountTypeORMRepository();
  const withdrawMoneyUseCase = new WithdrawMoney(bankAccountTypeORMRepository);
  return new WithdrawMoneyController(withdrawMoneyUseCase);
};
