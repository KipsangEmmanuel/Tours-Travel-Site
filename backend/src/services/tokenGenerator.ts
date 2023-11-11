import jwt from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();

const secretkey = process.env.SECRET as string;

export const generateToken = (
    email: string,
    id: string,
    username: string,
    role: boolean
): string => {
    return jwt.sign(
        {
            username,
            email,
            id,
            role
        },
        secretkey,
        { expiresIn: "24hrs"}
    );
};

