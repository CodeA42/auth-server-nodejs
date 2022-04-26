import { decode } from "jsonwebtoken"
import MissingTokenError from "../../error/MissingTokenError"

export default function getTokenExp(token: string): number {
    if(!token) throw new MissingTokenError(MissingTokenError.defaultMessage)

    const decoded: any = decode(token)
    return decoded.exp
}