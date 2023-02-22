import {BadRequestException, HttpException, HttpStatus} from '@nestjs/common';

export class AuthenticationException extends HttpException {
    constructor() {
        super('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }

    getLanguageIsoCode(languageId: number) {
        return Number(languageId) === 1 ? 'en' : 'ar';
    }

    EmailAlreadyExist(languageId: number) {
        const errorMessage = {
            en: 'The email entered is already being used by another account please enter another email address'
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    PhoneAlreadyExist(languageId: number) {
        const errorMessage = {
            en: 'The phone entered is already being used by another account please enter another phone number',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    InvalidPhoneNumber(languageId: number) {
        const errorMessage = {
            en: 'Invalid phone number',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    EmailLinkExpired(languageId: number) {
        const errorMessage = {
            en: 'The Email Link Expired',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    UserNotFound(languageId: number) {
        const errorMessage = {
            en: 'This email doesn\'t exist',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    PhoneNotFound(languageId: number) {
        const errorMessage = {
            en: 'This phone doesn\'t exist',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    AccountBlocked(languageId: number) {
        const errorMessage = {
            en: 'Your account has been blocked. Please contact our customer care',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    IncorrectEmailOrPassword(languageId: number) {
        const errorMessage = {
            en: 'The email and password you entered did not match our records. Please double-check and try again.',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }

    IncorrectPassword(languageId: number) {
        const errorMessage = {
            en: 'Invalid password',
        };
        return new BadRequestException(
            errorMessage[this.getLanguageIsoCode(languageId)],
        );
    }
}
