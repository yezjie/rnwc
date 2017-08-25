/*
* webview组件
* 功能，传入一个地址，展示地址效果
* 需要功能组件：Text，View，StyleSheet，WebView
* 外部传入内容：地址path
* */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

class WebTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowError:false,
            url:this.props.url
        }
    }
    _onError(){
        this.setState({
            isShowError:true
        })
    }
    render(){
        console.log(this.state.url)
        return(
            <View style={styles.container}>
                {
                    this.state.isShowError?
                        <View style={styles.errView}>
                            <Text style={styles.errText}>网络请求出错，请查看链接地址是否出错，或进行正确的网络设置</Text>
                        </View>:
                    <WebView
                        source={{uri:this.state.url}}
                        onError={()=>this._onError()}
                        startInLoadingState={true}
                    />
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    errView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    errText:{
        fontSize:18,
        width:300,
    }
})
module.exports = WebTest;