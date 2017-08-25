import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

var Util = require("../component/util");
var RWebView = require("../component/webview");
var List = require("./list")

class Recommend extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:this.props.data
        }
    }
    showDetails(title,url){
        this.props.navigator.push({
            title:title,
            component:RWebView,
            passProps:{
                url:url
            }
        })
    }
    showList(){
        this.props.navigator.push({
            component:List,
            title:"管理",
            passProps:{
                type:"manager",
                text:"管理"
            }
        })
    }
    render(){
        var data = this.state.data
        return(
            <View style={styles.container}>
                <Text style={styles.title}>推荐专题</Text>
                <View>
                    <View style={styles.imgBox}>
                        <TouchableOpacity onPress={()=>{
                            this.showDetails(data[0].title,data[0].url);
                        }}>
                            <Image style={styles.img} source={{uri:data[0].img}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.showDetails(data[1].title,data[1].url);
                        }}>
                            <Image style={styles.img} source={{uri:data[1].img}}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.showList()}>
                        <Text  style={styles.more}>查看同期专题 ></Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        marginTop:20,
        paddingLeft:10,
        paddingRight:10
    },
    title:{
        fontSize:17,
        fontWeight:"700",
        color:"#5c5c5c"
    },
    imgBox:{
        flexDirection:"row",
        marginTop:5,
        marginBottom:5
    },
    img:{
        width:(Util.windowSize.width-30)/2,
        height:80,
        marginRight:10
    },
    more:{
        fontSize:15,
        fontWeight:"300",
        color:"#7f7f7f"
    }


})
module.exports = Recommend;