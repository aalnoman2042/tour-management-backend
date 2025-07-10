
import { UserControllers } from "./user.controller";

import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";
import { Router } from "express";






const router = Router()

router.post("/register",
    
 validationRequest(createUserZodSchema),
UserControllers.createUSer)


router.get("/all-users", UserControllers.getAllUsers)

export const userRouter = router