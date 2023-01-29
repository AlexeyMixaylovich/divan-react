import _ from 'lodash';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { SelectChangeEvent } from '@mui/material';
import { products as dbProducts } from '../data/products';

import { IProduct, ICategory } from '../models';
import { categories } from '../data/categories';
import { ESortByProduct } from '../constants';

type TGetProductsData = {
  skip: number,
  limit: number,
  sortBy: ESortByProduct,
  category: ICategory
};
function getProducts({ skip, limit, sortBy }: TGetProductsData) {
  let products = _.sortBy(dbProducts, [sortBy]);// .slice(skip, limit);
  if ([ESortByProduct.DATE].includes(sortBy)) {
    products = products.reverse();
  }
  const total = products.length;
  return {
    products: products.slice(skip, limit),
    total,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [productsPageCount, setProductsPageCount] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<ESortByProduct>(ESortByProduct.DATE);

  async function fetchProducts(options?: { newPage?: number, sortBy?: ESortByProduct }) {
    const skip = ((options?.newPage || page) - 1) * 12;
    const limit = skip + 12;
    const category = categories[tabIndex];
    console.log({
      page: options?.newPage || page,
      sortBy: options?.sortBy || sortBy,
    });
    const res = getProducts({
      skip,
      limit,
      sortBy: options?.sortBy || sortBy,
      category,
    });
    setProducts(res.products);
    setProductsPageCount(Math.ceil(res.total / 12));
  }
  const handleChangeSortBy = (event: SelectChangeEvent) => {
    const newSortBy = event.target.value as ESortByProduct;
    setSortBy(newSortBy);
    fetchProducts({ sortBy: newSortBy });
  };
  const handleChangeTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    fetchProducts();
  };

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    fetchProducts({ newPage: value });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    productsPageCount,
    page,
    tabIndex,
    sortBy,
    handleChangePage,
    handleChangeTabIndex,
    handleChangeSortBy,
  };
}
