import { type } from "os";

export type DbUserData = {
    user_id: string,
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
}

export type TokenUser = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string
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