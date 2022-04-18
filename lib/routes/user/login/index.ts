import selectByUsername from "../../../db/queries/user/select/byUsername";
import generateToken from "../../../utils/tokens/generateToken";
import selectByEmail from "../../../db/queries/user/select/byEmail";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { TokenUser } from "../../../common/types";
import insertToken from "../../../db/queries/token/insert";
import User from "../../../db/Entities/user/User.Entity";
import getTokenExp from "../../../utils/tokens/getExp";

async function login(req: Request, res: Response){
    const resultByEmail = await selectByEmail(req.body.email);
    let userData: User = resultByEmail[0];

    if(!userData){
        const resultByUsername = await selectByUsername(req.body.username);
        if(!resultByUsername[0]){
            return res.status(404).json(process.env.wrongLoginCredentialsMessage);
        }
        userData = resultByUsername[0]
    }

    const user: TokenUser = {   id:         userData.id,
                                username:   userData.username,
                                email:      userData.email,
                                admin:      userData.admin
    };
    
    if(await bcrypt.compare(req.body.password, userData.password)){
        const accessToken: string = generateToken(user, process.env.ACCESS_TOKEN_SECRET, process.env.accessTokenDuration);
        const refreshToken: string = generateToken(user, process.env.REFRESH_TOKEN_SECRET, process.env.refreshTokenDuration);

        try{
            const userAgent = req.headers["user-agent"]
            const exp: number = getTokenExp(refreshToken);
            await insertToken(refreshToken, exp, user.username, userAgent);
            
            res.status(200)
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            return res.json({accessToken, user});
        } catch(e){
            console.error(e);
            return res.status(500);
        }
    } else {
        return res.sendStatus(404).json(process.env.wrongLoginCredentialsMessage);
    }
}

export default login;