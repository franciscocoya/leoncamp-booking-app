export interface User{
    id: number;
    name: string,
    surname: string,
    email: string,
    password: string,
    newPassword?: string,
    repeatedPassword?: string,
    userConfiguration?: {
        language: string,
        currency: {
            alphanumericCode: string,
            name: string,
            code: string,
        }
    },
    profileImage?: Blob,
    datosHost?: {
        dni: string,
        bio: string,
        direction: string,
        emailVerified: boolean,
        dniVerified: boolean,
        phoneVerified: boolean,
        verified: boolean,
    },
    createdAt: Date
}