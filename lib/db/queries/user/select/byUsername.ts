import { AppDataSource } from "../../.."
import MissingUsernameError from "../../../../error/MissingUsernameError"
import UserNotFoundError from "../../../../error/UserNotFoundError"
import User from "../../../Entities/user/User.Entity"

export default async function selectByUsername(username: string): Promise<User | null> {
    if(!username) throw new MissingUsernameError(MissingUsernameError.defaultMessage)
    
    try{
        const user: User = await AppDataSource.manager.findOne(User,{where:{
            username
        }})
        if(user) return user
        throw new UserNotFoundError(UserNotFoundError.defaultMessage)
    } catch(e) {
        console.log(e)
        return null
    }
}