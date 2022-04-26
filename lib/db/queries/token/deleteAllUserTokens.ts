import { AppDataSource } from "../.."
import MissingUsernameError from "../../../error/MissingUsernameError"
import Token from "../../Entities/token/Token.Entity"

export async function deleteAllUserTokens(username: string) {
    if(!username) throw new MissingUsernameError(MissingUsernameError.defaultMessage)
    
    try{
        const result = await AppDataSource.manager.delete(Token,{username})
        return result
    } catch(e) {
        console.error(e)
    }
}