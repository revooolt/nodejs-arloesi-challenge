import { IBankAccountData } from '../../../domain/entities/bank-account/bank-account-data';
import { InvalidAccountNumberError } from '../../../domain/entities/bank-account/errors/invalid-account-number-error';
import { InvalidAgencyNumberError } from '../../../domain/entities/bank-account/errors/invalid-agency-number-error';
import { InvalidRepresentativeAddressError } from '../../../domain/entities/bank-account/errors/invalid-representative-address-error';
import { InvalidRepresentativeBirthdateError } from '../../../domain/entities/bank-account/errors/invalid-representative-birthdate-error';
import { InvalidRepresentativeCpfError } from '../../../domain/entities/bank-account/errors/invalid-representative-cpf-error';
import { InvalidRepresentativeEmailError } from '../../../domain/entities/bank-account/errors/invalid-representative-email-error';
import { InvalidRepresentativeNameError } from '../../../domain/entities/bank-account/errors/invalid-representative-name-error';
import { InvalidRepresentativePhoneNumberError } from '../../../domain/entities/bank-account/errors/invalid-representative-phone-number-error';
import { Either } from '../../../either';

export type CreateAccountResponse = Either<
  | InvalidAccountNumberError
  | InvalidAgencyNumberError
  | InvalidRepresentativeCpfError
  | InvalidRepresentativeNameError
  | InvalidRepresentativeEmailError
  | InvalidRepresentativeBirthdateError
  | InvalidRepresentativeAddressError
  | InvalidRepresentativePhoneNumberError,
  IBankAccountData
>;
