import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBankAccount1642862464534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bankAccounts',
        columns: [
          {
            name: 'accountNumber',
            type: 'integer',
          },
          {
            name: 'agencyNumber',
            type: 'integer',
          },
          {
            name: 'balance',
            type: 'integer',
          },
          {
            name: 'openingDate',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'representativeCpf',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'representativeName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'representativeEmail',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'representativeBirthdate',
            type: 'timestamp',
          },
          {
            name: 'representativeAddress',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'representativePhoneNumber',
            type: 'integer',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bankAccounts');
  }
}
