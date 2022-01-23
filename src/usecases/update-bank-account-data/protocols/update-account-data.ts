import { UpdateBankAccountDataResponse } from './update-account-data-response';

export interface IUpdateAccountData {
  updateBankAccountData: (
    representativeCpf: number,
    newRepresentativeEmail?: string,
    newRepresentativeAddress?: string,
    newRepresentativePhoneNumber?: number
  ) => Promise<UpdateBankAccountDataResponse>;
}
