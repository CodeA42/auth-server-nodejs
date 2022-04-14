import { AppDataSource } from "../.."
import Token from "../../Entities/token/Token.Entity"

export async function insertToken(token: string, exp: number, username: string, userAgent: string) {
    const tokenEntity = new Token()
    tokenEntity.token = token
    tokenEntity.exp = exp
    tokenEntity.username = username
    tokenEntity.userAgent = userAgent
    
    await AppDataSource.manager.save(tokenEntity)
}