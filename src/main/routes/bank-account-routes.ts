import { Router } from 'express';

import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeCreateBankAccountController } from '../factories/create-bank-account';
import { makeDeleteBankAccountController } from '../factories/delete-bank-account';
import { makeDepositMoneyController } from '../factories/deposit-money';
import { makeReadAllBankAccountsController } from '../factories/read-all-bank-accounts';
import { makeTransferMoneyController } from '../factories/transfer-money';
import { makeUpdateBankAccountDataController } from '../factories/update-bank-account-data';
import { makeWithdrawMoneyController } from '../factories/withdraw-money';

export default (router: Router): void => {
  router.post('/create', adaptRoute(makeCreateBankAccountController()));
  router.get('/read', adaptRoute(makeReadAllBankAccountsController()));
  router.put('/update', adaptRoute(makeUpdateBankAccountDataController()));
  router.delete(
    '/delete/:representativeCpf',
    adaptRoute(makeDeleteBankAccountController())
  );
  router.post('/deposit', adaptRoute(makeDepositMoneyController()));
  router.post('/withdraw', adaptRoute(makeWithdrawMoneyController()));
  router.post('/transfer', adaptRoute(makeTransferMoneyController()));
};
