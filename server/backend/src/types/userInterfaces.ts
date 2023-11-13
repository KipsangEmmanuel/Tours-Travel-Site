export interface updatUser {
  id: string;
  username: string;
  email: string;
}
export interface user extends updatUser {
  password: string;
  // isdeleted: boolean;
  role: string;
}

export interface ExtendedUser extends Request {
  info?: updatUser;
}

export interface checkDetailsUser {
  _id: string;
  username: string;
  email: string;
  role:string
}

// export interface User{
//   id:string,
//   username:string,
//   email:string,
//   password:string
// }

// export interface userLogin{
//   email:string,
//   password:string
// }

// export interface User extends userLogin{
//   id:string,
//   username:string

// }