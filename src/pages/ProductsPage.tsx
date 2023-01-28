import {
  Box, Grid, Pagination,
} from '@mui/material';

import { Product } from '../components/Products';
import { useProducts } from '../hooks/products';

export function ProductsPage() {
  const {
    products, productsPageCount, page, handleChangePage,
  } = useProducts();

  return (
    <Box>
      <Grid container>
        {products.map((product) => (
          <Grid xs={3} padding="2px">
            <Product product={product} key={product.atr} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={productsPageCount}
        shape="rounded"
        hidePrevButton
        hideNextButton
        page={page}
        onChange={handleChangePage}
        boundaryCount={4}
      />
    </Box>

  );
}
