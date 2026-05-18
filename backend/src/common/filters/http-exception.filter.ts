import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | string[] = exception.message;
    let error = exception.name.replace('Exception', '');

    if (this.isHttpExceptionResponse(exceptionResponse)) {
      if (exceptionResponse.message) message = exceptionResponse.message;
      if (exceptionResponse.error) error = exceptionResponse.error;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }

  private isHttpExceptionResponse(
    response: unknown,
  ): response is HttpExceptionResponse {
    return typeof response === 'object' && response !== null;
  }
}
