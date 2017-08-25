/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS
} from 'react-native';

var Movies = require("./ios_view/ios");
var Map = require("./ios_view/map");
var Reade = require("./ios_view/reade");
var SheZ = require("./ios_view/shezhi");
class Rnwc extends Component {
    constructor(){
        super();
        this.state = {
            title:'图书'
        }
    }
    _select(tit){
        this.setState({
            title:tit
        })
    }
    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="卫生间"
                    icon={require("./img/toilet.png")}
                    selected={this.state.title == "卫生间"}
                    onPress={()=>this._select("卫生间")}
                >
                    <Map></Map>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="图书"
                    icon={require("./img/reader.png")}
                    selected={this.state.title == "图书"}
                    onPress={()=>this._select("图书")}>
                    <Reade></Reade>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="电影"
                    icon={require("./img/movie.png")}
                    selected={this.state.title == "电影"}
                    onPress={()=>this._select("电影")}>
                    <Movies></Movies>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="设置"
                    icon={require("./img/set.png")}
                    selected={this.state.title == "设置"}
                    onPress={()=>this._select("设置")}>
                    <SheZ></SheZ>
                </TabBarIOS.Item>
            </TabBarIOS>
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

AppRegistry.registerComponent('rnwc',()=>Rnwc);
