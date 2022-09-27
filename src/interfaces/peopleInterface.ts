export default interface IPeople {
  id?: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  password: string;
}

export interface IPeopleAuth {
  email: string;
  password: string;
}
