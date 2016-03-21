import React, {
  View,
  Text,
  PropTypes,
  StyleSheet
} from 'react-native'

import Button from 'react-native-button'
import PersonaliButton from './personaliButton'

class ProductPageExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      negotiationResponse: ''
    };

    this.getPersonaliData = this.getPersonaliData.bind(this);
  }

  getPersonaliData() {
    const data = {
      sku: this.props.productId,
      name: this.props.productName,
      price: this.props.price
    };
    return data;
  }

  render() {
    const personaliData = this.getPersonaliData();
    return (
      <View style={styles.container}>
        <View><Text style={styles.productName}>{this.props.productName}</Text></View>
        <View><Text style={styles.price}>Price: {this.props.price}</Text></View>
        <View style={styles.buyButtonContainer}>
          <Button
            style={styles.buyButton}
            onPress={() => console.log('BUY button pressed')}>BUY</Button>
        </View>
        <PersonaliButton
          product={personaliData}
          hiddenViewSize={{ width:150, height:70 }}
          viewSize={{ width:150, height:70 }}
          onNegotiationResponse={(event) => this.setState({
            negotiationResponse: JSON.stringify(event)
          })}
          />
        <Text>{this.state.negotiationResponse}</Text>
      </View>
    );
  }
}

ProductPageExample.propTypes = {
  productName: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  productName: {
    fontSize: 25,
    color: '#000'
  },
  price: {
    fontSize: 20,
    color: '#000'
  },
  buyButtonContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  buyButton: {
    fontSize: 25,
    color: '#fff',
    backgroundColor: '#500',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

export default ProductPageExample
