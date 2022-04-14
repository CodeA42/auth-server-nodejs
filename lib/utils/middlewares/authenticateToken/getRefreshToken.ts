import { Request } from "express";

function getRefreshToken(req: Request): string | null{
    return req.cookies.refreshToken || null;
}

getRefreshToken.prototype.tokenSecret = process.env.REFRESH_TOKEN_SECRET;

export default getRefreshToken;