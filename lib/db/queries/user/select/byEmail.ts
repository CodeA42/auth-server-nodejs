import { AppDataSource } from "../../..";
import User from "../../../Entities/user/User.Entity";

export default async function selectByEmail(email: string): Promise<User[]>{
    if(email !== undefined){
        try{
            return await AppDataSource.manager.find(User,{where:{
                email
            }});
        } catch(e) {
            console.error(e)
        }
    }
    return []
}