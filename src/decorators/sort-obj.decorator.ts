import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const DEFAULT_SORT_OBJ = { id: 'ASC' };

export const SortObj = createParamDecorator((customDefaultSortObj: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { sortBy, sortValue } = request.query;
    const isNeedDefault = !Boolean(sortBy && sortValue);

    if (isNeedDefault) return customDefaultSortObj || DEFAULT_SORT_OBJ;

    return { [sortBy]: sortValue };
});
