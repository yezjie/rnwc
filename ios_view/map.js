import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

var WebTest = require("./component/webview");

class Map extends Component{
    render(){
        return(
            <View style={styles.container}>
                <WebTest url="http://www.yezhaojie.com/near.html"></WebTest>
            </View>
        )
    }indexs
}

var styles = StyleSheet.create({
    container:{
        flex:1
    }
})
module.exports = Map;