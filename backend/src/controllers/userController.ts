import { v4 as uuidv4 } from 'uuid'
import { execute, query } from '../services/dbconnect'
import _ from "lodash";
import { User } from '../types/userInterface';
import { Request, Response } from 'express';
import { validateLoginUser, validateRegisterUser } from '../validators/userValidator';
import { comparePassword, hashPass } from '../services/passwordHash';
import { generateToken } from '../services/tokenGenerator';


export const registerUser = async(req:Request, res:Response) => {
    try{
        const { username, email, password } = req.body

        const { error } = validateRegisterUser.validate(req.body);

        if (error)
            return res.status(400).send({
                error: "password should be atleast 8 characters long with letters symbols and uppercase"
            })
        
        const newPassword = await hashPass(password);

        const procedure1 = "getUserByEmail";
        const result = await execute(procedure1, { email });

        const userWithEmail = result.recordset[0];

        if(userWithEmail)
            return res.status(404).send({
                error: "Account already exixt"
         })

        const newUser: User = {
            id: uuidv4(),
            username,
            email,
            password: newPassword,
            role: ''
        }
        console.log(newUser);      

        const procedureName = "registerUser";
        const params = newUser;

        await execute(procedureName, params);

        return res.send({
            message: "User Registered successfully"
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        })
    }  

}

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const procedureName = "getUserByEmail";
  
      // console.log(req.body);
    
      const { error } = validateLoginUser.validate(req.body);
  
      if (error)
        return res.status(400).send({
          success: false,
          error:
            "password should be atleast 8 characters long <br> with letters symbols and uppercase",
        });
        
      const result = await execute(procedureName, { email });
      // console.log(result)
      if (result) {
        const recordset = result.recordset;
        // console.log(recordset)
        const user = recordset[0];
        // console.log(user)
  
        if (!user) {
          return res.status(404).send({ error: "Account does not exist" });
        }
  
        const validPassword = await comparePassword(password, user.password);
  
        if (!validPassword) {
          return res.status(404).send({ error: "Invalid password" });
        }
  
        const token=generateToken(
          user.email,
          user._id,
          user.username,

          user.role
        );

        // console.log(token);
        
        return res.send({
          message: "Logged in successfully",
          token,
        });
      } else {
        return res.status(404).send({ message: "Account does not exist" });
      }
    } catch (error) {
      console.log(error);
    }
  };





















export const getUsers = async (req:Request, res:Response) => {
    try{
        const procedureName = 'getUsers';
        const result = await query(`EXEC ${procedureName}`);
        res.json(result.recordset)

    }catch (error) {
        console.log(error)
    }

}




