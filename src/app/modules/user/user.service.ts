/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { IAuthProvider,  Iuser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../../config/env";
import AppError from "../../ErrorHelpers/AppError";
// creating a user
const createUser = async(payload : Partial<Iuser>)=>{
      const {name , email, password, ...rest} = payload

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exist")
    }

    const hashedPassword =await bcryptjs.hash(password as string, 10)

    
     
    const authProvider : IAuthProvider = {provider : "credentials", providerId: email as string}



     const user = await User.create({
        name,
        email,
        auths: [authProvider],
        password: hashedPassword,
        ...rest
    })

    return user
    
}
// updating a user
const updateUser = async (userId: string, payload: Partial<Iuser>, decodedToken: JwtPayload) => {
console.log(decodedToken.role, payload.role);

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     * 
     * promoting to superadmin - superadmin
     */

    if (payload.role ) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
           
            
        }

        if (payload.role === Role.SPER_ADMIN && decodedToken.role === Role.ADMIN) {
            console.log("not okay");
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
            
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVar.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
}

const getAllUsers = async () => {
    const users = await User.find({})

    return users

}

export const userServices = {
    createUser,
    getAllUsers,
    updateUser
}