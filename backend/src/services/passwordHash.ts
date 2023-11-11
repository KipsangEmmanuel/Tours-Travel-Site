import bcrypt from "bcrypt"

export const hashPass = async (password: string) => {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = bcrypt.hash(password, salt)

    return hashPassword;
}

export const comparePassword = async (inputPass: string, dbPass:string) => {
    const validPass = await bcrypt.compare(inputPass, dbPass);
    return validPass; 

}