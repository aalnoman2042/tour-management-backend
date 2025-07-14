/* eslint-disable no-console */

import { Server } from "http";
import mongoose from "mongoose";

import { envVar } from "./app/config/env";
import app from "./app";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;



const startserver = async () => {
  try {
    await mongoose.connect(
      envVar.DB_URL
    );

    console.log("connect to db");


    server = app.listen(envVar.PORT, () => {
      console.log(`server is listening to ${envVar.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
(async()=>{
  
await startserver()
await seedSuperAdmin()

})()
// error handle 
process.on("unhandledRejection", (err)=>{
    console.log("unhandle rejection detected , server is shutting down", err);

    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit()
})
process.on("uncaughtException", (err)=>{
    console.log("uncaught rejection detected , server is shutting down", err);

    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit()
})
process.on("SIGTERM", ()=>{
    console.log("sigterm signal ", );

    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit()
})
process.on("SIGINT", ()=>{
    console.log("sigINt , server shutting down", );

    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit()
})
