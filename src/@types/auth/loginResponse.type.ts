import { StaticImageData } from "next/image";

export interface loginResponse {
    status: string
    message?: string
    token: string
    user: User
    error?: string;

}


export interface User {
    id: number
    name: string
    email: string
    idNumber: number,
    phone_number: string
    created_at: Date
    updated_at?: Date
    image?: null | string | StaticImageData
}

