import { ErrorRequestHandler } from 'express'
import { HttpException } from '@api/exceptions/httpexception'

export const errorHandler: ErrorRequestHandler = (
  error: HttpException,
  req,
  res,
  next
) =>
  res.status(error.status).json({
    message: error?.message,
    response: error?.response
  })
