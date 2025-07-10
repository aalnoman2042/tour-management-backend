import { NextFunction, Request, Response } from "express"
import { envVar } from "../config/env"
import AppError from "../ErrorHelpers/AppError"

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const globaslErrorHandler  = (err : any, req:Request, res: Response, next: NextFunction )=>{
            let statusCode = 500
       let message= `someting went wrong`

            if(err instanceof AppError){
                statusCode = err.statusCode
                message = err.message
            }
            else if (err instanceof Error){
                statusCode = 500
                message = err.message
            }


        res.status(statusCode).json({
            success: false,
            message,
            err,
            stack: envVar.NODE_ENV === "development" ? err.stack : null
            
        })
}