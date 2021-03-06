import { AppDataSource } from "../.."
import MissingUsernameError from "../../../error/MissingUsernameError"
import UserNotFoundError from "../../../error/UserNotFoundError"
import User from "../../Entities/user/User.Entity"

export default async function selectByUsername(username: string): Promise<User | null> {
    if(!username) throw new MissingUsernameError()
    
    try{
        const user: User = await AppDataSource.manager.findOne(User,{where:{
            username
        }})
        if(user) return user
    } catch(e) {
        console.log(e)
        return null
    }
    throw new UserNotFoundError()
}