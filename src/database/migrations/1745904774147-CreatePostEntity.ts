import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostEntity1745904774147 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "post",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "author_id",
          type: "int",
        },
        {
          name: "title",
          type: "varchar",
          isNullable: false
        },
        {
          name: "slug",
          type: "varchar",
          isNullable: false,
          isUnique: true
        },
        {
          name: "content",
          type: "text",
        },
        {
          name: "published_at",
          type: "timestamp",
          isNullable: true
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
    }));

    await queryRunner.createForeignKey("post", new TableForeignKey({
      columnNames: ["author_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "app_user",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("post");
  }
}
