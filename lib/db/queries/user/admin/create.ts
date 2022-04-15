
import { AppDataSource } from "../../.."
import User from "../../../Entities/user/User.Entity"
import { insertUser } from "../insert"
import * as bcrypt from 'bcrypt';

export async function createAdmin() {
    const password = await bcrypt.hash(process.env.adminPassword, Number(process.env.saltRounds));

    const admin = new User();
    admin.username = process.env.adminUsername
    admin.password = password
    admin.email = process.env.adminMail
    admin.admin = true

    AppDataSource.manager.save(admin);
}