import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  isError: boolean;
  status: string;
  message: string;
  data: T;
  pageInfo?: PageInfo;
}

export interface PageInfo {
  pageCount: number;
  currentPage: number;
  nextPage?: number;
  itemCount: number;
  totalItemsCount: number;
  pageLimit: number;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response: Response<T> = {
          code: 200,
          isError: !data,
          status: 'OK',
          message: 'success',
          data: data.rows || data,
          pageInfo: this.getPaginateInfo(data),
        };

        return response;
      }),
    );
  }

  private getPaginateInfo(data: any): PageInfo {
    if (!data.rows) {
      return undefined;
    }
    const pageCount = Math.ceil(data.count / data.limit);
    const currentPage = data.currentPage;
    const nextPage = currentPage < pageCount ? currentPage + 1 : null;
    const itemCount = data.rows.length;
    const totalItemsCount = data.count;
    const pageLimit = data.limit;
    return {
      pageCount,
      currentPage,
      nextPage,
      itemCount,
      totalItemsCount,
      pageLimit,
    };
  }
}
