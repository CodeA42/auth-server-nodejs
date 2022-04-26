import { AppDataSource } from "../.."
import MissingTokenError from "../../../error/MissingTokenError"
import Token from "../../Entities/token/Token.Entity"

export async function deleteToken(token: string) {
    if(!token) throw new MissingTokenError(MissingTokenError.defaultMessage)
    
    //TODO: check if item is deleted
    try{
        return await AppDataSource.manager.delete(Token,{token});
    } catch(e) {
        console.error(e)
        return null
    }
}