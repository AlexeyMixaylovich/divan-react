import {
  Box, FormControl, Grid, InputLabel, MenuItem,
  Pagination, Select, Stack, Tab, Tabs,
} from '@mui/material';

import { useProducts } from '../hooks/products';
import { Product } from '../components/Products';
import { categories } from '../data/categories';
import { ESortByProduct } from '../constants';

export function ProductsPage() {
  const {
    products, productsPageCount, page, tabIndex, sortBy,
    handleChangePage, handleChangeTabIndex, handleChangeSortBy,
  } = useProducts();

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTabIndex}
          variant="scrollable"
          scrollButtons
        >
          {categories.map((category) => <Tab label={category.name} key={category.code} />)}
        </Tabs>
      </Box>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product) => (
          <Grid
            xs={2}
            sm={3}
            md={3}
          >
            <Product product={product} key={product.atr} />
          </Grid>
        ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <Pagination
          count={productsPageCount}
          shape="rounded"
          hidePrevButton
          hideNextButton
          page={page}
          onChange={handleChangePage}
          boundaryCount={3}
          siblingCount={3}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel id="sort_by_select-label">Сортировка по</InputLabel>
          <Select
            labelId="sort_by_select-label"
            id="sort_by_select"
            value={sortBy}
            onChange={handleChangeSortBy}
            autoWidth
            label="SortBy"
          >
            <MenuItem value={ESortByProduct.NAME}>Имени</MenuItem>
            <MenuItem value={ESortByProduct.PRICE}>Цене</MenuItem>
            <MenuItem value={ESortByProduct.DATE}>Дате</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>

  );
}
