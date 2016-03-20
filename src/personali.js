import React, {
  NativeModules,
  DeviceEventEmitter,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Animated,
  Easing,
  PropTypes
} from 'react-native'

import Button from 'react-native-button'

const PersonaliAndroid = NativeModules.PersonaliAndroid;

const animationEase = Easing.quad;
const animationDuration = 300;

class PersonaliButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldDisplay: false,
      buttonLabel: '',
      buttonStyle: {
        container: {},
        text: {}
      },
      viewSizeAnim: {
        width: new Animated.Value(0),
        height: new Animated.Value(0),
      }
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('negotiationResponse', (event) => {
      console.log('negotiationResponse event: ', event);
    });
    this.fetchPersonaliData(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.product && nextProps.product.sku !== this.props.product.sku) {
      this.setState({
        shouldDisplay: false
      });
      this.fetchPersonaliData(nextProps);
      return false;
    }
    return true;
  }

  handlePress() {
    PersonaliAndroid.negotiate(this.props.product.sku);
  }

  fetchPersonaliData(props) {
    const product = props.product;

    PersonaliAndroid.getInitialData({
      sku: product.sku,
      price: product.price,
      name: product.name
    }, (err) => {
      console.log(err);
    },
    (shouldDisplay, buttonLabel, buttonStyle) => {
      this.setState({
        shouldDisplay,
        buttonLabel,
        buttonStyle: {
          container: {
            backgroundColor: buttonStyle.backgroundColor
          },
          text: {
            color: buttonStyle.color,
            fontSize: buttonStyle.fontSize
          }
        }
      });
    });
  }

  render() {
    let size;

    if (this.state.shouldDisplay) {
      size = {
        width: this.props.viewSize.width,
        height: this.props.viewSize.height
      };
    } else {
      size = {
        width: this.props.hiddenViewSize.width,
        height: this.props.hiddenViewSize.height
      };
    }

    Animated.timing(
      this.state.viewSizeAnim.width,
      { toValue: size.width, duration: animationDuration, easing: animationEase }
    ).start();

    Animated.timing(
      this.state.viewSizeAnim.height,
      { toValue: size.height, duration: animationDuration, easing: animationEase }
    ).start();

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <Animated.View
          style={[styles.container, {
            width: this.state.viewSizeAnim.width,
            height: this.state.viewSizeAnim.height
          }, this.state.buttonStyle.container]}
          >
          <Text style={this.state.buttonStyle.text}>{this.state.buttonLabel}</Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}

PersonaliButton.propTypes = {
  product: PropTypes.shape({
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string,
    user: PropTypes.string
    // ... etc
  }),
  viewSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  hiddenViewSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

PersonaliButton.defaultProps = {
  viewSize: {
    width: 100,
    height: 50
  },
  hiddenViewSize: {
    width: 0,
    height: 0
  }
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PersonaliButton;
