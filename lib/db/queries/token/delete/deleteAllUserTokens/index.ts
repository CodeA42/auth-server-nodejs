import { AppDataSource } from "../../../..";
import Token from "../../../../Entities/token/Token.Entity";

export async function deleteAllUserTokens(username: string) {
    if(username !== undefined) {
        try{
            return await AppDataSource.manager.delete(Token,{username});
        } catch(e) {
            console.log(e);
        }
    }
}