"use server";
import { loginResponse } from "@/@types/auth/loginResponse.type";
import { AqsaGuestAPI } from "@/services";


export type loginProps = {
    password: string;
    email: string
}

export const login = async ({ email, password }: loginProps): Promise<loginResponse> => {

    //FIXME: remove this => just as  an example
    const FakeData: loginResponse = {
        status: "200",
        message: "تم تسجيل الدخول بنجاح",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
            id: 1,
            name: "John Doe",
            email: email,
            idNumber: 408656429,
            phone_number: "+1234567890",
            created_at: new Date("2024-01-20T12:00:00.000Z"),
            image: null
        },
        error: "Error message in Arabic"
    }
    return await new Promise((resolve) => {
        // Return fake data after 3 seconds => Simulate API delay
        setTimeout(() => {
            resolve(FakeData);
        }, 2000);
    });


    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaGuestAPI.post("/auth/login", {
            email,
            password,
        });

        if (response.data) {
            return {
                status: "200",
                message: "تم تسجيل الدخول بنجاح",
                token: response.data.token,
                user: response.data.user
            };
        }

        return {
            status: "500",
            message: "حدث خطأ في تسجيل الدخول",
            token: "",
            user: {
                id: 0,
                name: "",
                email: "",
                idNumber: 0,
                phone_number: "",
                created_at: new Date(),
                image: null
            },
            error: "حدث خطأ في تسجيل الدخول"
        };

    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "حدث خطأ في تسجيل الدخول",
            token: "",
            user: {
                id: 0,
                name: "",
                email: "",
                idNumber: 0,
                phone_number: "",
                created_at: new Date(),
                image: null
            },
            error: error.response?.data?.error || "حدث خطأ في تسجيل الدخول"
        };
    }
}
