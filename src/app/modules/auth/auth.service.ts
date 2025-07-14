import AppError from "../../ErrorHelpers/AppError"
import { Iuser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bycryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"
import { generateToken } from "../../utils/jwt"
import { envVar } from "../../config/env"

const credentialLogin = async (payload : Partial<Iuser>)=>{

    const {email, password} = payload
    // console.log(email, "email");
    

    const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new    AppError(httpStatus.BAD_REQUEST , "email does not exist")
    }

    const isPasswordMatched = await bycryptjs.compare(password as string , isUserExist.password as string)

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

     
    const jwtPayload = {
        userId: isUserExist._id,
        email : isUserExist.email,
        role: isUserExist.role,
    }

    const  accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRES)

    return {
        accessToken
    }

}


export const AuthServices = {
    credentialLogin
}