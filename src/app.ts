import express, {   Request, Response } from "express";

import cors from "cors"
import { router } from "./app/routes";
;
import { globaslErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/NotFound";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/v1", router)






app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "welsome to tour mangement backend"
    })
})

// global error handleer

app.use(notFound)
app.use(globaslErrorHandler)

export default app
