import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostEntity1745904774147 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "posts",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
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
          type: "timestamp"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
        }
      ]
    }));

    await queryRunner.createForeignKey("posts", new TableForeignKey({
      columnNames: ["author_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "app_user",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}
