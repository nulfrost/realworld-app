export enum Message { // no idea how to name this
  INVALID = 'ValidationError', // 422
  CLIENT = 'ClientError', // 400
  AUTH = 'AuthorizationError',
  SERVER = 'ServerError', // 500
  NOTFOUND = 'NotFound', // 404
}
