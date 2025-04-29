import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserEntity1745856135038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "app_user",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "username",
          type: "varchar",
          isNullable: false,
          isUnique: true
        },
        {
          name: "password_hash",
          type: "varchar",
          isNullable: false
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false,
          isUnique: true
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()"
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("app_user");
  }

}
