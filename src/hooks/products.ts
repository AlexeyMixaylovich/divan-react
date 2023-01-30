import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';

import { SelectChangeEvent } from '@mui/material';

import { isNumber } from 'lodash';
import { IProduct, ICategory } from '../models';

import { ESortByProduct, PRODUCTS_DOMAIN } from '../constants';

type TGetProductsBody = {
  navigate: {
    skip: number;
    limit: number;
  };
  filters?: {
    category?: string;
  };
  sort?: {
    field: ESortByProduct;
    direction: 'asc' | 'desc';
  }[];
};

interface ICatRes {
  items: ICategory[],
}

interface IProductRes {
  items: IProduct[],
  total: number

}
const lPage = 12;
export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [page, setPage] = useState<number>(1);
  const [productsPageCount, setProductsPageCount] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<ESortByProduct>(ESortByProduct.UPDATED_AT);

  async function fetchProducts(options?: {
    newPage?: number,
    sortBy?: ESortByProduct,
    tabIndex?: number
  }) {
    const sortField = options?.sortBy || sortBy;
    const sortDirection = sortField === ESortByProduct.UPDATED_AT ? 'desc' : 'asc';

    const newTabIndex = isNumber(options?.tabIndex)
      ? options?.tabIndex as number
      : tabIndex;

    const category = categories[newTabIndex];
    const url = `${PRODUCTS_DOMAIN}/product/list`;
    const body: TGetProductsBody = {
      navigate: {
        skip: ((options?.newPage || page) - 1) * lPage,
        limit: lPage,
      },
      sort: [{
        field: sortField,
        direction: sortDirection,
      }],
      filters: {
        category: category?.code || undefined,
      },

    };

    const { data: { items, total } } = await axios.post<IProductRes>(url, body);

    setProducts(items);
    setProductsPageCount(Math.ceil(total / lPage));
  }
  async function fetchCategories() {
    const url = `${PRODUCTS_DOMAIN}/product/categories`;
    const { data } = await axios.get<ICatRes>(url);
    setCategories(data.items);
  }
  const handleChangeSortBy = (event: SelectChangeEvent) => {
    const newSortBy = event.target.value as ESortByProduct;
    setSortBy(newSortBy);
    fetchProducts({ sortBy: newSortBy });
  };
  const handleChangeTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setPage(1);

    fetchProducts({ tabIndex: newValue, newPage: 1 });
  };

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    fetchProducts({ newPage: value });
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    productsPageCount,
    page,
    tabIndex,
    sortBy,
    handleChangePage,
    handleChangeTabIndex,
    handleChangeSortBy,
  };
}
