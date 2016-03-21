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
        productIndex: 0
    };
    this.nextProduct = this.nextProduct.bind(this);
  }

  nextProduct() {
    this.setState({
      productIndex: this.state.productIndex >= dummyProducts.length - 1 ?
        0 : this.state.productIndex + 1
    });
  }

  render() {
    const product = dummyProducts[this.state.productIndex];

    return (
      <View style={styles.container}>
        <View>
          <Button onPress={this.nextProduct}>View next product</Button>
        </View>
        <ProductPageExample
          productId={product.id}
          productName={product.name}
          price={product.price}
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
