import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = null;
        let error = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse: any = exception.getResponse();
            message = exceptionResponse.message;
            error = exceptionResponse.error;
        }

        response
            .status(status)
            .json({
                code: status,
                isError: true,
                status: error || 'Failure',
                message,
                data: null,
                exception: exception.toString(),
            });
    }
}
