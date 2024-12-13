import { userCardTypes, ToastType, genderEnum, } from "./Enums"


export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    emailId: string,
    age: number
    gender: genderEnum
    skills?: string[]
    theme: string
    photoUrl?: string
    about?: string
}


export interface OtherUser {
    _id: string
    firstName: string
    lastName?: string
    age?: number | undefined
    gender?: genderEnum
    photoUrl?: string
    about?: string
}


export interface ConnectionRequestType {
    _id: string
    fromUserId: OtherUser
    toUserId: string
}



export interface UserCardProps {
    userDetails: OtherUser
    type: userCardTypes
}


export type BaseToastType = {
    message: string
    type: ToastType
}

