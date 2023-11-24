export interface updatUser {
  id: string;
  username: string;
  email: string;
}
export interface user extends updatUser {
  password: string;
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

