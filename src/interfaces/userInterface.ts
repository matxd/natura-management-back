export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface IUserPut {
  name: string;
  image?: string;
}
