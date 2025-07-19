import AppError from "../../ErrorHelpers/AppError"
import {  Iuser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bycryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"


import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens"


// new login giving jwt tokens and all
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
    const userToken = createUserTokens(isUserExist)

     
    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email : isUserExist.email,
    //     role: isUserExist.role,
    // }

    // const  accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRES)

    // const refreshToken = generateToken(jwtPayload, envVar.JWT_REFRESH_SECRET, envVar.JWT_REFRESH_EXPIRES)
    // delete isUserExist.password

    return {
        accessToken : userToken.accessToken, 
        refreshToken : userToken.refreshToken,
        user : isUserExist
    }

}

// giving new token toh the existing user
const getNewAccessToken = async (refreshToken: string)=>{

   const NewAccessToken = createNewAccessTokenWithRefreshToken(refreshToken)
  
  

    return {
        accessToken :  NewAccessToken
    }

}


export const AuthServices = {
    credentialLogin,
    getNewAccessToken
}