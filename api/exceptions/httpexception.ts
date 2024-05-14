export class HttpException extends Error {
  status: number
  message: string
  response?: any
  constructor({
    status = 500,
    message = 'Erro inesperado, tente novamente mais tarde.',
    response = undefined
  }: {
    status?: number
    message?: string
    response?: any
  }) {
    super(message)
    this.status = status
    this.message = message
    this.response = response
    Object.setPrototypeOf(this, HttpException.prototype)
  }
}
