import selectByUsername from "../../db/queries/user/selectByUsername"
import generateToken from "../../utils/tokens/generateToken"
import selectByEmail from "../../db/queries/user/selectByEmail"
import * as bcrypt from "bcrypt"
import { Request, Response } from "express"
import { TokenUser } from "../../common/types"
import insertToken from "../../db/queries/token/insert"
import User from "../../db/Entities/user/User.Entity"
import getTokenExp from "../../utils/tokens/getExp"
import MissingEmailError from "../../error/MissingEmailError"
import MissingUsernameError from "../../error/MissingUsernameError"
import UserNotFoundError from "../../error/UserNotFoundError"

export default async function login(req: Request, res: Response){
    if(!req.body.password) return res.status(400).json("Missing Password")

    let userData: User
    try {
        userData = await selectByEmail(req.body.email || req.body.login)
    } catch(e) {
        if(e instanceof MissingEmailError || e instanceof UserNotFoundError) {
            try {
                 userData = await selectByUsername(req.body.username || req.body.login)
            } catch(e) {
                if(e instanceof MissingUsernameError || e instanceof UserNotFoundError) {
                    return res.status(404).json(process.env.wrongLoginCredentialsMessage)
                }
            }
        }
    }

    const user: TokenUser = {   id:         userData.id,
                                username:   userData.username,
                                email:      userData.email,
                                admin:      userData.admin
    }

    if(await bcrypt.compare(req.body.password, userData.password)){
        const accessToken: string = generateToken(user, process.env.ACCESS_TOKEN_SECRET, process.env.accessTokenDuration)
        const refreshToken: string = generateToken(user, process.env.REFRESH_TOKEN_SECRET, process.env.refreshTokenDuration)

        try{
            const userAgent = req.headers["user-agent"]
            const exp: number = getTokenExp(refreshToken)
            await insertToken(refreshToken, exp, user.username, userAgent)
            
            res.status(200)
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
            return res.json({accessToken, user})
        } catch(e){
            console.error(e)
            return res.status(500)
        }
    } else {
        return res.sendStatus(404).json("Wrong username or password")
    }
}