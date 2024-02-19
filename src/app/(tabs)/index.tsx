import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';

export default function TabOneScreen() {
  const product = products[0];
  return (
    <View style={styles.container}>
      <Image source={{ uri : product.image}} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    padding:10,
    borderRadius:20
  },
  title: {
    fontSize:20,
    fontWeight:'bold',
  },
  price:{
    fontSize:18,
    fontWeight:'600',
    color:Colors.light.tint
  },
  image:{
    width:'100%',
    aspectRatio:1,
    resizeMode:'contain'
  }
});
