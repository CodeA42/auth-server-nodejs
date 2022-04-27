import { AppDataSource } from "../.."
import MissingEmailError from "../../../error/MissingEmailError"
import UserNotFoundError from "../../../error/UserNotFoundError"
import User from "../../Entities/user/User.Entity"

export default async function selectByEmail(email: string): Promise<User | null>{
    if(!email) throw new MissingEmailError()
    
    try{
        const user: User = await AppDataSource.manager.findOne(User,{where:{
            email
        }})
        if(user) return user
    } catch(e) {
        console.error(e)
        return null
    }
    throw new UserNotFoundError()
}