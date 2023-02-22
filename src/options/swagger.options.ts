import {DocumentBuilder} from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
    .setTitle('Food-APP')
    .setDescription('Food APP Api Documentation')
    .setVersion('1.0')
    .addTag('test')
    .build();
