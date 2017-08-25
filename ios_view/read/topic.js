import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
// 外部传入data、navigator

var RWebView = require("../component/webview");
var List = require("./list");
var Util = require("../component/util");

class Topic extends Component{
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
            title:this.props.title,
            passProps:{
                type:this.props.type,
                text:"管理"
            }
        })
    }
    render(){
        var data = this.state.data;
        var _this = this;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>推荐专题</Text>
                <View style={styles.itemBox}>
                    {

                        data.map(function (val,i) {
                            return  <TouchableOpacity key={i}
                                                      style={styles.item}
                                                      onPress={()=>{
                                                          _this.showDetails(val.title,val.url);
                                                      }}>
                                        <Image source={{uri:val.img}} style={styles.itemImg}/>
                                        <Text numberOfLines={2}>{val.title}</Text>
                                    </TouchableOpacity>
                        })
                    }
                </View>
                <TouchableOpacity>
                    <Text>查看更多 ></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        marginTop:20,
        paddingLeft:10,
        paddingRight:10,
    },
    title:{
        fontSize:17,
        fontWeight:"700",
        color:"#5c5c5c"
    },
    itemBox:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    item:{
        width:(Util.windowSize.width-60)/4,
        height:145,
        margin:5
    },
    itemImg:{
        flex:1,
        marginBottom:3,
        borderRadius:3
    }
})
module.exports = Topic;