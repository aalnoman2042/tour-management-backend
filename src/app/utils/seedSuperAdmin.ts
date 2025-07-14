import { envVar } from "../config/env";
import { IAuthProvider, Iuser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async()=>{
    try {
        const isSuperAdminExist = await User.findOne({email: envVar.SUPER_ADMIN_EMAIL})

        if(isSuperAdminExist){
            console.log("super admin already exist");
            return
        }

        console.log("trying to crate super admin");
        
        const hashPassword = await bcryptjs.hash(envVar.SUPER_ADMIN_PASSWORD, Number(envVar.BCRYPT_SALT_ROUND))
console.log(envVar.SUPER_ADMIN_PASSWORD);

        const authProvider : IAuthProvider = {
            provider: "credentials",
            providerId: envVar.SUPER_ADMIN_EMAIL
        }


        const payload : Iuser = {
            name: "super admin",
            role: Role.SPER_ADMIN,
            email: envVar.SUPER_ADMIN_EMAIL,
            isVerified: true,
            password : hashPassword,
            auths: [authProvider]

        }

        const superAdmin = await User.create(payload)
        console.log(superAdmin);
        
    } catch (error) {
        console.log(error);
        
    }
}