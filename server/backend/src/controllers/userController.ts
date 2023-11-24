import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";
import _ from "lodash";
import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { v4 as uuidv4, v4 } from "uuid";
import { ExtendedUser, updatUser, user } from "../types/userInterfaces";
import { generateToken } from "../services/tokenGenerator";
import {
  validateLoginUser,
  validateRegisterUser,
  validateUpdateuser,
  validateuserId,
} from "../validators/userValidator";
import { comparePass } from "../services/passwordHash";
import { sqlConfig } from "../config/config";
import jwt from 'jsonwebtoken'




export const getAllUsers = async (req: Request, res: Response) => {
  try{
    const procedureName = "getUsers_";

    const result = await query(`EXEC ${procedureName}`);

    console.log(result);
    
  
    res.json(result.recordset);
  }catch(error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error"
    })
    
  }

};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);
    if (!id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "getUserById";
    const result = await execute(procedureName, { id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async(req: Request, res: Response) => {
  try{
    let {username, password, email} = req.body

    let {error} = validateRegisterUser.validate(req.body)

    if(error){
      return res.status(404).json({error: error.details})
    }

    const hashedPwd = await bcrypt.hash(password, 5)

    const pool = await mssql.connect(sqlConfig)

    let result = await pool.request()
      .input("id", mssql.VarChar, v4())
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPwd)
      .execute('registerUser')

      console.log(result)

      return res.status(200).json({
        message: 'User registered successfully'
      })

  }catch(error) {
    return res.json({
      error: error
    })
  }
}

export const loginUser = async(req:Request, res: Response) =>{
  try {
      const {email, password} = req.body

      const {error} = validateLoginUser.validate(req.body)

      if(error){
          return res.status(422).json({error: error.message})
      }

      const pool = await mssql.connect(sqlConfig)

      let user = await (await pool.request().input("email", email).execute('loginUser')).recordset

      console.log(user);
      
      
      if(user[0]?.email  == email){
          const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

          if(!CorrectPwd){
              return res.status(401).json({
                  error: "Incorrect password"
              })
          }

          const LoginCredentials = user.map(records =>{
              const {password, ...rest}=records

              return rest
          })

          // console.log(LoginCredentials);

          // dotenv.config()
          const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
              expiresIn: '24h'
          }) 

          return res.status(200).json({
              message: "Logged in successfully", token
          })
          
      }else{
          return res.json({
              error: "Email not found"
          })
      }

  } catch (error) {
    console.log(error)
      return res.json({
          error: "Internal server error"
      })
  }
}



// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password, email } = req.body;

//     const { error } = validateRegisterUser.validate(req.body);

//     if (error)
//       return res.status(400).send({
//         error:
//           "password should be at least 8 characters long with letters symbols and uppercase",
//       });

//     const newPassword = await hashPass(password);

//     const procedure1 = "getUserByEmail";
//     const result = await execute(procedure1, { email });

//     const userWithEmail = result.recordset[0];

//     if (userWithEmail)
//       return res
//         .status(404)
//         .send({ error: "Account exists with the given email" });

//     const newUser = {
//       id: uuidv4(),
//       username,
//       email,
//       password: newPassword,
//     };

//     console.log(newUser);

//     const procedureName = "registerUser";
//     // const params = { ...newUser, role: { value: newUser.role, type: 'nvarchar' } };

//     await execute(procedureName, newUser);

//     return res.status(201).send({ message: "User registered successfully" });
//   } catch (error) {
//     console.log(error);
//     res.send({ error: (error as Error).message });
//   }
// };



// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const procedureName = "getUserByEmail";

//     // console.log(req.body);
    

//     const { error } = validateLoginUser.validate(req.body);

//     if (error)
//       return res.status(400).send({
//         success: false,
//         error:
//           "password should be atleast 8 characters long <br> with letters symbols and uppercase",
//       });
      
//     const result = await execute(procedureName, { email });
//     // console.log(result)
//     if (result) {
//       const recordset = result.recordset;
//       // console.log(recordset)
//       const user = recordset[0];
//       // console.log(user)

//       if (!user) {
//         return res.status(404).send({ error: "Account does not exist" });
//       }

//       const validPassword = await comparePass(password, user.password);

//       if (!validPassword) {
//         return res.status(404).send({ error: "Invalid password" });
//       }

//       const token = generateToken(
//         user.email,
//         user._id,
//         user.username,
//         user.role
//       );
//       return res.send({
//         message: "Logged in successfully",
//         token,
//       });
//     } else {
//       return res.status(404).send({ message: "Account does not exist" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, username, email } = req.body;

    const { error } = validateUpdateuser.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const newUser: updatUser = {
      id,
      username,
      email,
    };

    const procedureName = "updateUser";
    const params = newUser;
    // console.log(params);

    await execute(procedureName, params);
    return res.send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);
    if (!id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateuserId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "deleteUser";
    await execute(procedureName, { id });

    res.status(201).send({ message: "User deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getUnAssignedUser = async (req: Request, res: Response) => {
  try {
    // console.log(id);

    const procedureName = "getUnassignedUser";
    const result = await query(`EXEC ${procedureName}`);

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async () => {
  try{

  }catch (error) {
    console.log(error)
  }

};


export const forgotPassword = async () => {};

export const checkUserDetails = async (request: any, res: Response) => {
  // console.log("checking details");
  if (request.info) {
    console.log(request.info);
    
    return res.json({
      info: request.info,
    });
  }
};
