import { type } from "os";

// export type DbUserData = {
//     user_id: string,
//     username: string,
//     email: string,
//     password: string
// }

export type TokenUser = {
    id: string,
    username: string,
    email: string
}

export type DecodedToken = {
    user: TokenUser,
    iat: number,
    exp: number
}

export type MissingRegisterData = {
    username: boolean,
    email: boolean,
    password: boolean
}

export const MissingRegisterDataDefault = {
    username: false,
    email: false,
    password: false
}