import {Injectable, PipeTransform} from '@nestjs/common';
import {classToPlain} from 'class-transformer';
import {PAGE_LIMIT} from '../constants/pagination.constants';

export interface PaginationType {
    pageNo: number;
    offset: number;
    limit: number;
}

export interface ResponsePaginateOutType<T = any> {
    rows: T[];
    count: number;
    limit: number;
    currentPage: number;
}

interface ResponsePaginateInType<T = any> {
    rowsAndCount: [T[], number];
    pagination: PaginationType;
    plain?: boolean;
}

@Injectable()
export class PaginationPipe implements PipeTransform<string, object> {

    transform(page: string): PaginationType {
        const limit = PAGE_LIMIT;
        const pageNo = page ? parseInt(page, 0) : 1;
        const offset = (pageNo - 1) * limit;
        return {
            pageNo,
            offset,
            limit,
        };
    }
}

export function paginateArray(array: any[], { offset, limit }: PaginationType): any[] {
    return array.slice(offset, offset + limit);
}

export function responsePaginate<T = any>({
    rowsAndCount: [rows, count],
    pagination: { limit, pageNo: currentPage },
    plain = false,
}: ResponsePaginateInType<T>): ResponsePaginateOutType<T> {
    return {
      count, limit, currentPage,
      rows: plain ? classToPlain<T[]>(rows) as T[]: rows,
    };
}
