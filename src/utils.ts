import { BaseEntity, FindManyOptions } from "typeorm";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "An error occurred.";
};

export async function paginate<T extends BaseEntity>(
  entity: typeof BaseEntity & { new(): T },
  limit: number | null,
  offset: number | null,
  queryOptions?: FindManyOptions
): Promise<[T[], total: number, limit: number, page: number]> {
  const take = limit ?? 5;
  const skip = take * Math.max((offset ?? 0) - 1, 0);
  const [posts, postsCount] = await entity.findAndCount({
    skip,
    take,
    ...queryOptions
  });

  return [ posts, postsCount, take, (skip + 1) ];
}
