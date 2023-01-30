export interface IProduct {
  name: string;
  url: string;
  atr: string;
  price: number;
  oldPrice: number;
  createdAt: string;
  updatedAt:string
  imageUlr?: string;
}

export interface ICategory {
  name: string;
  code: string
}
