import { Secret, sign} from "jsonwebtoken";
import { TokenUser } from "../../common/types";

export default function generateToken(user: TokenUser, key: Secret, expiresIn: string = process.env.accessTokenDuration): string {
    return sign({user}, key, { 'expiresIn': expiresIn});
}