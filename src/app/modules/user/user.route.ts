
import { UserControllers } from "./user.controller";

import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middlewares/validateRequest";

import { checkAuth } from "../../middlewares/checkAuth";
import { Router } from "express";
import { Role } from "./user.interface";






const router = Router()




router.post("/register",
    
 validationRequest(createUserZodSchema),
UserControllers.createUSer)


router.get("/all-users",checkAuth(Role.ADMIN , Role.SPER_ADMIN),   UserControllers.getAllUsers)

router.patch("/:id", checkAuth(...Object.values(Role)), UserControllers.updateUSer)
export const userRouter = router