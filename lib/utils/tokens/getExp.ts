import { decode } from "jsonwebtoken";

export default function getTokenExp(token: string): number {
    const decoded: any = decode(token);
    return decoded.exp;
}