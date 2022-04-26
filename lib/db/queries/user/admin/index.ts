import UserNotFoundError from "../../../../error/UserNotFoundError";
import User from "../../../Entities/user/User.Entity";
import selectByUsername from "../selectByUsername";

export default async function adminDoesNotExist(): Promise<boolean> {
    let adminExists: boolean = true
    try {
        const admin: User = await selectByUsername(process.env.adminUsername)
        if (admin) adminExists = false
    } catch(e) {
        if(e instanceof UserNotFoundError) {
            return adminExists
        }
        console.error(e)
        return adminExists
    }

    return adminExists
}