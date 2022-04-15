import { Router, Request, Response } from "express";
import login from "./user/login";
import register from "./user/register";
import logout from "./user/logout";
import refresh from "./user/refresh";
import validateUser from "../utils/middlewares/authenticateToken/validateUser";
import getRefreshToken from "../utils/middlewares/authenticateToken/getRefreshToken";
import logoutEverywhere from "./user/logout/everywhere";

const router: Router = Router();  
router.post("/register", register);
router.post("/login", login);
router.get("/logout", validateUser(getRefreshToken), logout)
router.get("/refresh", validateUser(getRefreshToken), refresh)
router.get("/logout-everywhere", validateUser(getRefreshToken), logoutEverywhere)

router.use("*", (req: Request, res: Response) => {
  res.status(404).json(`Invalid request {${req.originalUrl}}`);
})

export default router