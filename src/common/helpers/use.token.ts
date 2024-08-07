import { UseToken } from "src/auth/interfaces";

export const useToken = (token: string): UseToken | string => {
    try {
         
    } catch (error) {
        return "invalid token"
    }
}