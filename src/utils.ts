import { BaseEntity } from "typeorm";

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
  limit: number,
  offset: number
): Promise<[T[], count: number]> {
  const take = limit || 5
  const skip = take * (Math.max(offset - 1, 0));

  return await entity.findAndCount({
    skip,
    take,
  });
}
