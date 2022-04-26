import { Request, Response} from "express"
import { insertUser } from "../../db/queries/user/insert"
import selectByEmail from "../../db/queries/user/selectByEmail"
import selectByUsername from "../../db/queries/user/selectByUsername"
import { validateEmail } from "../../utils/validation/validateEmail"
import * as bcrypt from "bcrypt"
import { MissingRegisterData, MissingRegisterDataDefault } from "../../common/types"

export default async function register(req: Request, res: Response){
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    //check if all the must have data is sent to the server
    if(!(username && email && password)){
        const missingData: MissingRegisterData = MissingRegisterDataDefault
        if(!username){
            missingData.username = true
        }
        if(!email){
            missingData.email = true
        }
        if(!password){
            missingData.password = true
        }
        return res.status(406).json(missingData)
    }

    if(!validateEmail(email)){
        return res.status(400).json('Invalid email')
    }

    try {
        await selectByEmail(email);
        return res.status(409).json('Email exists')
    } catch(e) {}

    try {
        await selectByUsername(username);
        return res.status(409).json('Username exists')
    } catch(e) {}

    try{
        const passwordHashed = await bcrypt.hash(password, Number(process.env.saltRounds))
        await insertUser(   username,
                            passwordHashed,
                            email
        );

        return res.sendStatus(201)
    } catch(e) {
        console.error(e)
        return res.sendStatus(500)
    }
}