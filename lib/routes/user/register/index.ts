import { Request, Response} from "express";
import { insertUser } from "../../../db/queries/user/insert";
import selectByEmail from "../../../db/queries/user/select/byEmail";
import { selectByUsername } from "../../../db/queries/user/select/byUsername";
import { validateEmail } from "../../../utils/validation/validateEmail";
import * as bcrypt from "bcrypt";
import { MissingRegisterData, MissingRegisterDataDefault } from "../../../common/types";

async function register(req: Request, res: Response){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //check if all the must have data is sent to the server
    if(!(username && email && password)){
        const missingData: MissingRegisterData = MissingRegisterDataDefault;
        if(!username){
            missingData.username = true;
        }
        if(!email){
            missingData.email = true;
        }
        if(!password){
            missingData.password = true;
        }
        return res.status(406).json(missingData);
    }

    if(!validateEmail(email)){
        return res.status(400).json('Invalid email');
    }

    //check if the email is in the database
    const emailCheck = await selectByEmail(email);
    if(emailCheck.length !== 0) {
        return res.status(409).json('Email exists');
    }
    
    //check if the username is in the database
    const usernameCheck = await selectByUsername(username);
    if(usernameCheck.length !== 0) {
        return res.status(409).json('Username exists');
    }

    try{
        const passwordHashed = await bcrypt.hash(password, Number(process.env.saltRounds));
        await insertUser(   username,
                            passwordHashed,
                            email,
                            req.body.firstName,
                            req.body.lastName
        );

        return res.sendStatus(201);
    } catch(e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

export default register;