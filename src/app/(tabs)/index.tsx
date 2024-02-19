import { Text, View } from '../../components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';



export default function MenuScreen() {
  const product = products[0];
  return (
    <View>
      <ProductListItem product={product}/>
      <ProductListItem product={product}/>
    </View>
  );
}

