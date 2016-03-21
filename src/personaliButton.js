import React, {
  NativeModules,
  DeviceEventEmitter,
  View,
  ScrollView,
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
      viewAnim: {
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),
      }
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('negotiationResponse', (event) => {
      console.log('negotiationResponse event: ', event);
      if (this.props.onNegotiationResponse) {
        this.props.onNegotiationResponse(event);
      }
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
    if (this.state.shouldDisplay) {
      PersonaliAndroid.negotiate(this.props.product.sku);
    }
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
    let animParams;

    if (this.state.shouldDisplay) {
      animParams = {
        opacity: 1,
        width: this.props.viewSize.width,
        height: this.props.viewSize.height
      };
    } else {
      animParams = {
        opacity: 0,
        width: this.props.hiddenViewSize.width,
        height: this.props.hiddenViewSize.height
      };
    }

    Animated.timing(this.state.viewAnim.opacity,
      { toValue: animParams.opacity, duration: animationDuration, easing: animationEase }
    ).start();

    Animated.timing(this.state.viewAnim.width,
      { toValue: animParams.width, duration: animationDuration, easing: animationEase }
    ).start();

    Animated.timing(this.state.viewAnim.height,
      { toValue: animParams.height, duration: animationDuration, easing: animationEase }
    ).start();

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <Animated.View
          style={[styles.container, {
            opacity: this.state.viewAnim.opacity,
            width: this.state.viewAnim.width,
            height: this.state.viewAnim.height
          }, this.state.buttonStyle.container]}
          >
          <Text style={[styles.text, this.state.buttonStyle.text]}>{this.state.buttonLabel}</Text>
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
  }),
  // mainly for debug but you can allow the client's app to make use of it
  onNegotiationResponse: PropTypes.func
};

PersonaliButton.defaultProps = {
  viewSize: {
    width: 100,
    height: 50
  },
  hiddenViewSize: {
    width: 100,
    height: 50
  }
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
  }
});

export default PersonaliButton;
