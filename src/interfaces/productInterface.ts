interface IWebsites {
  name: string;
  link: string;
  price: number;
}

export interface IProduct {
  name: string;
  title: string;
  description: string;
  image: string;
  status: boolean;
  websites: IWebsites[];
}
