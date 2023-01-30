import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import { RUB } from '../constants';
import { formateDate } from '../helpers/date';

import { IProduct } from '../models';

interface ProductProps {
  product: IProduct
}
export function Product({ product }: ProductProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300, border: '0' }}>
      <CardActionArea href={product.url} target="_blank">
        <CardMedia
          sx={{ height: 200 }}
          image={product.imageUlr}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" textAlign="right">
            {product.atr}
          </Typography>
          <Typography variant="h6">
            {`${product.price} ${RUB}`}
            {' '}
            <span style={{ textDecoration: 'line-through' }}>{`${product.oldPrice} ${RUB}`}</span>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {`Добавлен ${formateDate(product.updatedAt)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
