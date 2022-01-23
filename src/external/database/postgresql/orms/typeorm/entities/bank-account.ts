import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('bankAccounts')
export class BankAccount {
  @Column()
  accountNumber: number;

  @Column()
  agencyNumber: number;

  @Column()
  balance: number;

  @CreateDateColumn()
  openingDate: Date;

  @PrimaryColumn()
  representativeCpf: number;

  @Column()
  representativeName: string;

  @Column()
  representativeEmail: string;

  @Column()
  representativeBirthdate: Date;

  @Column()
  representativeAddress: string;

  @Column()
  representativePhoneNumber: number;
}
