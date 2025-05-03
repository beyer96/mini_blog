import CustomError from "./CustomError";

export default class NotFoundError extends CustomError {
  constructor({
    message,
    statusCode
  }: {
    message: string;
    statusCode?: number;
  }) {
    super({ message, statusCode: statusCode || 404 });
  }
}
