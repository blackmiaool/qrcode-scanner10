import React from 'react';
import {
  StyleSheet, Text, View, ToastAndroid,
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Clipboard,
  Share,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {
  BarCodeScanner,
  Permissions,
  Camera,
  WebBrowser,
  IntentLauncherAndroid
} from 'expo';
import { rnLess } from 'rn-less/src/runtime';
import style from './style.less.js';

const rootStyle = style({ vw: Dimensions.get('window').width / 100 });

function addParam(url, key, value) {
  url=url.replace(new RegExp(`[?&]${key}=[^&]*&?`,'g'),(str)=>str[str.length-1]==="&"?str[0]:"");
  let hashReg = /#[\w\-]+$/;
  let hash = url.match(hashReg) || [];
  hash = hash[0] || "";
  url = url.replace(hashReg, "");
  let linkSymbol = "&";
  if (url.indexOf("?") === -1) {
    linkSymbol = "?";
  }
  return `${url}${linkSymbol}${key}=${value}${hash}`
}

@rnLess(rootStyle.App)
export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    lastScannedData: "https://a.b",
    scanning: true
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
  onCopy = () => {
    Clipboard.setString(this.state.lastScannedData);
    let toast = Toast.show('Copy success', {
      duration: Toast.durations.LONG,
      position: -100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });
  };
  onShare = () => {
    Share.share({ title: '分享', message: this.state.lastScannedData, }, {});
  };
  onOpen = () => {
    WebBrowser.openBrowserAsync(this.state.lastScannedData)
  };
  getYoupinUrl = (url) => {
    return url.replace(/^https?/, 'youpin');
  };
  onOpenWithYoupin = () => {
    WebBrowser.openBrowserAsync(this.getYoupinUrl(this.state.lastScannedData));
    // IntentLauncherAndroid.startActivityAsync('com.xiaomi.youpin');
  };
  onRandomParam=()=>{
    this.setState({
      lastScannedData:addParam(this.state.lastScannedData,'random',Math.random())
    })
  };
  onSetDebug=()=>{
    this.setState({
      lastScannedData:addParam(this.state.lastScannedData,'debug',1)
    })
  };
  renderScannerReload() {
    return <View style="reload-container">
      <TouchableOpacity activeOpacity={0.7} onPress={this.onScannerReload}><Text style={["btn-primary", "scan-again-btn"]}>Scan again</Text></TouchableOpacity>
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
    return <View style="scanner-container"><BarCodeScanner
      onBarCodeRead={this._handleBarCodeRead}
      style="scanner"
    /></View>;

  }
  renderResultPanel() {
    return <View style="result-container">
      <View style="result-area">
        <Text style="label">
          Result
        </Text>
        <TextInput
          multiline
          style="result-input"
          onChangeText={(text) => this.setState({ lastScannedData: text })}
          value={this.state.lastScannedData}
        />
      </View>

      <View style="tools-wrap">
        <TouchableOpacity activeOpacity={0.7} onPress={this.onCopy}>
          <Text style={["btn-primary", "tool-btn"]}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={this.onShare}>
          <Text style={["btn-primary", "tool-btn"]}>Share</Text>
        </TouchableOpacity>


      </View>
      <View style="tools-wrap">
        <TouchableOpacity activeOpacity={0.7} onPress={this.onOpen}>
          <Text style={["btn-primary", "tool-btn"]}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onOpenWithYoupin}>
          <Text style={["btn-primary", "tool-btn"]}>有品</Text>
        </TouchableOpacity>
      </View>
      <View style="tools-wrap">
        <TouchableOpacity activeOpacity={0.7} onPress={this.onRandomParam}>
          <Text style={["btn-primary", "tool-btn"]}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onSetDebug}>
          <Text style={["btn-primary", "tool-btn"]}>Debug</Text>
        </TouchableOpacity>
      </View>
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

});