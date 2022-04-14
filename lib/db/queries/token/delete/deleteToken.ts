import { AppDataSource } from "../../..";
import Token from "../../../Entities/token/Token.Entity";

export async function deleteToken(token: string) {
    if(token !== undefined) {
        try{
            return await AppDataSource.manager.delete(Token,{token});
        } catch(e) {
            console.log(e);
        }
    }
}