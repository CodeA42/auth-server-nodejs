import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { DecodedToken } from "../../../common/types";
import { deleteToken } from "../../../db/queries/token/delete/deleteToken";

function validateUser(getToken: Function){
    return (req: Request, res: Response, next) => {
        const token = getToken(req);
        
        verify(token, getToken.prototype.tokenSecret, async (err: Error, decoded: DecodedToken) => {
            if(err) return res.sendStatus(403)

            if(Math.floor(Date.now() / 1000) > decoded.exp){
                if(getToken.prototype.tokenSecret === process.env.REFRESH_TOKEN_SECRET){
                    await deleteToken(token);
                    res.clearCookie('refreshToken')
                }
                return res.sendStatus(403);
            }
            
            res.locals.user = decoded.user
            next()
        })
    }
}

export default validateUser;