import { AppDataSource } from "../.."
import User from "../../Entities/user/User.Entity"


export async function insertUser(username: string, password: string, email: string) {
    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    user.admin = false

    return await AppDataSource.manager.save(user)
}