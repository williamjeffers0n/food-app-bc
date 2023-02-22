import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import {  Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();
        const message = exceptionResponse.message;
        const error = exceptionResponse.error;

        response
            .status(status)
            .json({
                code: status,
                isError: true,
                status: error || 'Failure',
                message,
                data: null,
            });
    }
}
