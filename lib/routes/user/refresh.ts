import { Request, Response } from "express"
import { TokenUser } from "../../common/types"
import generateToken  from "../../utils/tokens/generateToken"

export default function refresh(req: Request, res: Response) {
    const user: TokenUser = res.locals.user
    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, process.env.accessTokenDuration)

    return res.status(200).json({accessToken})
}