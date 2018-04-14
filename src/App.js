import React from 'react';
import {
  StyleSheet, Text, View, ToastAndroid,
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions, Camera } from 'expo';
import { rnLess } from 'rn-less/src/runtime';
import style from './style.less.js';

const rootStyle = style({ vw: Dimensions.get('window').width / 100 });

@rnLess(rootStyle.App)
export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    lastScannedData: "https://a.b",
    scanning: false
  };
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }
  _handleBarCodeRead = result => {
    this.setState({ scanning: false, lastScannedData: result.data });
    if (result.data !== this.state.lastScannedData) {
      // LayoutAnimation.spring();
      // ToastAndroid.show(result.data);

      // ToastAndroid.show(result.data, ToastAndroid.SHORT);
      // this.setState({ lastScannedUrl: result.data,scanning:true });
      // Alert.alert(
      //   'Open this URL?',
      //   result.data,
      //   [
      //     {
      //       text: 'Yes',
      //       onPress: () => Linking.openURL(result.data),
      //     },
      //     { text: 'No', onPress: () => { } },
      //   ],
      //   { cancellable: true }
      // );

    }
  };
  onScannerReload = () => {
    this.setState({ scanning: true });
  };
  renderScannerReload() {
    return <View style="reload-container">
      <TouchableOpacity activeOpacity={0.7} onPress={this.onScannerReload}><Text style="scan-again-btn">Scan again</Text></TouchableOpacity>
    </View>

  }
  renderScanner() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasCameraPermission === false) {
      return <Text style={{ color: '#fff' }}>
        Camera permission is not granted
        </Text>;
    }
    return <View style={{ borderColor: 'white', borderWidth: 2, position: 'relative' }}><BarCodeScanner
      onBarCodeRead={this._handleBarCodeRead}
      style={{
        height: 300, width: this.windowWidth - 4,
      }}
    /></View>;

  }
  renderResultPanel() {
    return <View style="result-container">
      <Text>
        {this.state.lastScannedData}
      </Text>
    </View>
  }
  render() {
    this.windowWidth = Dimensions.get('window').width;
    return (
      <View style="container">
        {this.state.scanning ? this.renderScanner() : this.renderScannerReload()}
        {this.renderResultPanel()}  
        <StatusBar hidden />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});