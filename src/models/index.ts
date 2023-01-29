export interface IProduct {
  name: string;
  sale?: string;
  url: string;
  atr: string;
  price: number;
  oldPrice: number;
  date: Date;
}

export interface ICategory {
  name: string;
  code: string
}
