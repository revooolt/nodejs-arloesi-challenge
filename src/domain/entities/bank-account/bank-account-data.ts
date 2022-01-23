export interface IBankAccountData {
  accountNumber: number;
  agencyNumber: number;
  balance?: number;
  openingDate?: Date;
  representativeCpf: number;
  representativeName: string;
  representativeEmail: string;
  representativeBirthdate: Date;
  representativeAddress: string;
  representativePhoneNumber: number;
}
