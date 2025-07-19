import { NextFunction, Request, Response } from "express"
// import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"

import { AuthServices } from "./auth.service"
import AppError from "../../ErrorHelpers/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const loginInfo = await AuthServices.credentialLogin(req.body);

      res.cookie("refreshToken", loginInfo.refreshToken,{
        httpOnly: true,
        secure: false
      })
      res.cookie("accessToken", loginInfo.accessToken,{
        httpOnly: true,
        secure: false
      })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: loginInfo,
    });
  } catch (error) {
    // console.error("Login Error:", error);
    next(error);
  }
};
const getNewAccessToken  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
      throw new AppError(httpStatus.BAD_REQUEST, "no refresh token recived from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: tokenInfo,
    });
  } catch (error) {
    // console.error("Login Error:", error);
    next(error);
  }
};



export const AuthController = {
    credentialLogin,
    getNewAccessToken
}