import { Request, Response } from "express"
import { deleteAllUserTokens } from "../../db/queries/token/deleteAllUserTokens"

export default async function logoutEverywhere(req: Request, res: Response){    
    try{
        await deleteAllUserTokens(res.locals.user.username)

        res.status(200)
        res.clearCookie('refreshToken')
        return res.json(process.env.loggedOutMessage)
    } catch(e){
        console.error(e)
        return res.sendStatus(500)
    }
}