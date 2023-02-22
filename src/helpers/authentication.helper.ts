import * as crypto from 'crypto';
export class AuthenticationHelper {

    // Create hash and salt for the password using Password Based Key Derivative Function 2 (PBKDF2)
    public static hashPassword(password) {
        if (!password) {
            return { salt: undefined, hash: undefined };
        }
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('base64');
        return { salt, hash };
    }

    // Verify if the stored hash and salt match the given password
    public static verifyHash(password, originalHash, salt) {
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('base64');
        return hash === originalHash;
    }

    public static generateMd5Hash(password) {
        let generatedCheckSum = crypto.createHash('md5').update(password).digest('hex');
        return generatedCheckSum;
    }

    public static verifyMD5Hash(password, oldHash) {
        let generatedCheckSum = crypto.createHash('md5').update(password).digest('hex');
        return generatedCheckSum === oldHash;
    }
}
