import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(catchError((error, caught): any => {
            if(error instanceof HttpException) {
                return Promise.resolve({
                    code: error.getStatus(),
                    message: error.getResponse()
                });
            }

            return Promise.resolve({
                code: 500,
                message: `出现了错误: ${error.toString()}`
            });
        }))
    }
}