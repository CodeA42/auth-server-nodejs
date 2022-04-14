import { Request, Response } from "express";
import { deleteToken } from "../../../db/queries/token/delete/deleteToken";

async function logout(req: Request, res: Response){
    const refreshToken = req.cookies.refreshToken;

    try{
        await deleteToken(refreshToken);

        res.status(200)
        res.clearCookie('refreshToken');
        return res.json(process.env.loggedOutMessage);
    } catch(e){
        console.error(e);
        return res.sendStatus(500);
    }
}

export default logout;