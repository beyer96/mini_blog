export default abstract class CustomError extends Error {

  statusCode: number;

  constructor({
    message,
    statusCode = 500
  }: {
    message: string;
    statusCode: number;
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
