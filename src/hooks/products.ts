import { useEffect, useState } from 'react';
import * as React from 'react';

import { products as dbProducts } from '../data/products';

import { IProduct } from '../models/product';

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [productsPageCount, setProductsPageCount] = useState<number>(0);

  async function fetchProducts() {
    const skip = (page - 1) * 12;
    const res = dbProducts.slice(skip, skip + 12);

    setProducts(res);
    setProductsPageCount(Math.ceil(dbProducts.length / 12));
  }

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    productsPageCount,
    page,
    handleChangePage,
  };
}
