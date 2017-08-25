import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

var Util = require("../component/util");
var List = require("./list");

class Category extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:this.props.data
        }
    }
    showList(title){
        var type = title;
        switch(type){
            case "互联网":
                type="it";
                break;
            case "管理":
                type="manager";
                break;
            case "散文":
                type="sanwen";
                break;
            case "笑话":
                type="cookies";
                break;
        }
        this.props.navigator.push({
            title:title,
            component:List,
            passProps:{
                type:type,
                text:title
            }
        })
    }
    render(){
        var data = this.state.data;
        var _this = this;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>推荐专题</Text>
                <View style={styles.viewBox}>
                    {
                        data.map(function (val,i) {
                            return  <TouchableOpacity
                                            key={i}
                                            style={styles.item}
                                            onPress={()=>{_this.showList(val.text)}}>
                                        <Text>{val.text}</Text>
                                    </TouchableOpacity>
                        })
                    }
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
    },
    viewBox:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    title:{
        fontSize:17,
        fontWeight:"700",
        color:"#5c5c5c"
    },
    item:{
        width:(Util.windowSize.width-40)/2,
        height:70,
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        margin:5
    }
})
module.exports = Category;