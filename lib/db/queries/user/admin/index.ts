import { AppDataSource } from "../../..";
import selectByUsername from "../select/byUsername";

export default async function adminDoesNotExist(): Promise<boolean> {
    const res = await selectByUsername(process.env.adminUsername);
    
    return !(res.length === 1)
}