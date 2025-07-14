import { NextFunction, Request, Response } from "express";
import AppError from "../ErrorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken"
import { envVar } from "../config/env";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...authRoles : string[]) =>async(req: Request, res: Response, next: NextFunction)=>{
try {
        const   accessToken = req.headers.authorization;
        if(!accessToken){
            throw new AppError(403, "no token recived")
        }

    const verifedToken = verifyToken(accessToken, envVar.JWT_ACCESS_SECRET) as JwtPayload

    if(!authRoles.includes(verifedToken.role)){
        throw new AppError(403, "you are not permited to access this")
    }

    
        next()

} 

catch (error) {
    next(error)
}

}