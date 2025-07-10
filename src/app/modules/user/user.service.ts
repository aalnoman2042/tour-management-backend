/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../ErrorHelpers/AppError";
import { IAuthProvider, Iuser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUser = async(payload : Partial<Iuser>)=>{
      const {name , email, password, ...rest} = payload

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exist")
    }
    const authProvider : IAuthProvider = {provider : "credentials", providerId: email as string}

     const user = await User.create({
        name,
        email,
        auths: [authProvider],
        password,
        ...rest
    })

    return user
}

const getAllUsers = async () => {
    const users = await User.find({})

    return users

}

export const userServices = {
    createUser,
    getAllUsers
}