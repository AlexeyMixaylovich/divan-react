import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import { RUB } from '../constants';
import { formateDate } from '../helpers/date';

import { IProduct } from '../models';

interface ProductProps {
  product: IProduct
}
const imgUrl = 'https://cdn2.divan.ru/img/v1/1Eg3BhZukgeAq4iyU0SVldAwNIoSBU5aAiBhnRQSCRk/t:0::0:0/pd:30:30:30:30/rs:fit:364:216:0:1:ce:0:0/g:ce:0:0/bg:f5f3f1/q:85/czM6Ly9kaXZhbi9wcm9kdWN0LzQxNzQyMzYucG5n.jpg';
export function Product({ product }: ProductProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300, border: '0' }}>
      <CardActionArea href={product.url}>
        <CardMedia
          sx={{ height: 140 }}
          image={imgUrl}
          title="green iguana"
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
            {`Добавлен ${formateDate(product.date)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
