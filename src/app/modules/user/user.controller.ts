import {  NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// creating a user 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUSer = catchAsync(async (req:Request , res: Response, next: NextFunction)=>{
const user = await userServices.createUser(req.body)

sendResponse(res, {
  success: true,
  statusCode: httpStatus.CREATED ,
  message : "user created successfuylly",
  data : user,
})

})
// update a user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUSer = catchAsync(async (req:Request , res: Response, next: NextFunction)=>{


const userId = req.params.id 
// const token = req.headers.authorization
 // const verifiedToken = verifyToken(token as string, envVar.JWT_ACCESS_SECRET) as JwtPayload
const  verifiedToken = req.user
const payload = req.body

const user = await userServices.updateUser(userId, payload, verifiedToken)
// console.log("user updating");
sendResponse(res, {
  success: true,
  statusCode: httpStatus.CREATED ,
  message : "user updated successfuylly",
  data : user,
})

})

// get all users


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async(req: Request, res: Response, next: NextFunction) =>{
 try {
   const users = await userServices.getAllUsers()

  res.status(httpStatus.OK).json({
    success: true,
    message: "all users retrive succefullty",
    data : users
  })
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 } catch (error : any) {
  console.log(error);

 }
}


export const UserControllers = {
    createUSer,
    getAllUsers,
    updateUSer
}