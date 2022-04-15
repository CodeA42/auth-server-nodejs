import { AppDataSource } from "../../..";
import User from "../../../Entities/user/User.Entity";

export default async function selectByUsername(username: string): Promise<User[]> {
    if(username !== undefined){
        try{
            return await AppDataSource.manager.find(User,{where:{
                username
            }});
        } catch(e) {
            console.log(e);
        }
    }
    return [];
}