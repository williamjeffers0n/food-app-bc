import {Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {

    transform(value: any) {
        return value;
    }
}
