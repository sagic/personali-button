'use strict'

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ProductPageExample from './src/productPageExample'
import Button from 'react-native-button'

const dummyProducts = [
  {
    id: "ABC-123-456",
    name: "Wand of Watoomb",
    price: 67.9
  },
  {
    id: "DEF-789-012",
    name: "The Ultimate Nullifier",
    price: 134
  },
  {
    id: "GHI-345-678",
    name: "Crimson Gem of Cyttorak",
    price: 82.1
  },
  {
    id: "JKL-901-234",
    name: "The Darkhold",
    price: 12
  },
  {
    id: "MNO-567-890",
    name: "Infinity Gauntlet",
    price: 100.001
  }
];

class personaliReactNative extends Component {

  constructor(props) {
    super(props);
    this.state = {
        product: dummyProducts[0]
    };
    this.replaceProduct = this.replaceProduct.bind(this);
  }

  replaceProduct() {
    this.setState({
      product: dummyProducts[parseInt(Math.random() * dummyProducts.length)]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button onPress={this.replaceProduct}>View random product</Button>
        </View>
        <ProductPageExample
          productId={this.state.product.id}
          productName={this.state.product.name}
          price={this.state.product.price}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('personaliReactNative', () => personaliReactNative);
