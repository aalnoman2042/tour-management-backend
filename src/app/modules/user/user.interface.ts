import { Types } from "mongoose"


export enum Role{
    SPER_ADMIN = "SPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthProvider {
    provider: "google" | "credentials" //google , credential
    providerId: string
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface Iuser {
    name: string
    email: string
    password?: string
    phone?: string
    picture?: string
    address?: string
    isDeleted?: boolean
    isActive?: IsActive
    isVerified?: boolean
    role : Role
    auths: IAuthProvider[]
    bookings?: Types.ObjectId[]
    guieds?: Types.ObjectId[]

}