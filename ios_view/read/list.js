import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';
// 功能： 根据外部传入的数据，生成列表,点击跳入详情页

import Util from "../component/util";

class Row extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:this.props.data,
        }
    }
    /*showDetails(title,url){
        this.props.navigator.push({
            title:title,
            component:WebText,
            passProps:{
                url:url
            }
        })
    }*/
    render(){
        var data = this.state.data;
        return(
            <TouchableOpacity
                style={styles.item}
                onPress={()=>{
                    this.props.navigate('myWebView',{url:data.url});
                }}>
                <Image source={{uri:data.img}} style={styles.itemImg}/>
                <View style={styles.itemBox}>
                    <Text style={styles.font1}>{data.title}</Text>
                    <Text style={styles.font2}>{data.time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
var _this;
class List extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!=r2
        })
        this.state = {
            dataSource:ds.cloneWithRows(['row 1', 'row 2']),
            params:this.props.navigation.state.params
        }
    }
    componentDidMount(){
        var path = "http://123.57.39.116:3000/data/read?type="+this.state.params.type;
        Util.getData(path,function (res) {
            var ds = new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!=r2
            })
            this.setState({
                dataSource:ds.cloneWithRows(res.data)
            })
        }.bind(this),function (err) {
            console.log(err);
            alert("请求出错")
        })
    }
    _renderRow(data,_this){
        return <Row data={data} navigate={_this.state.params.navigate}/>
    }
    render(){
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>this._renderRow(rowData,this)}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:10,
        paddingRight:10,
        marginTop:15,
    },
    title:{
        textAlign:"center",
        fontSize:20
    },
    item:{
        flex:1,
        flexDirection:"row"
    },
    itemImg:{
        width:80,
        height:110,
        margin:5
    },
    itemBox:{
        marginLeft:10,
        justifyContent:"center"
    },
    font1:{
        fontSize:18,
        width:240
    },
    font2:{
        fontSize:16,
        color:"#ccc",
        marginTop:10,
    }
})
module.exports = List;