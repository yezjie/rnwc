import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import TextView from './component/webview';
var _this;
class firstPage extends Component{
    constructor(){
        super();
        var ds = new ListView.DataSource({
            rowHasChanged:(oldData,newData)=>oldData!=newData
        })
        this.state = {
            dataSource:ds,
            isShow:false,
            text:""
        }
    }
    getData(){
        fetch("https://api.douban.com/v2/movie/coming_soon")
            .then((res)=>res.json())
            .then((resJson)=>{
                console.log(resJson.subjects);
                var ds = new ListView.DataSource({
                    rowHasChanged:(oldData,newData)=>oldData!=newData
                })
                this.setState({
                    dataSource:ds.cloneWithRows(resJson.subjects),
                    isShow:true
                })
            })
            .catch((err)=>console.log(err))
    }
    componentDidMount () {
        this.getData();
    }
    /*jumpToNext() {
        var nextRoute={
            title:"搜索结果",
            component:secPage,
            passProps:{
                text:this.state.text,
            }
        }
        this.props.navigator.push(nextRoute)
    }*/
    /*showDetail(title,alt){
        this.props.navigator.push({
            title:title,
            component:TextView,
            passProps:{
                url:alt
            }
        })
    }*/
    _renderRow(data){
        return(
            <TouchableOpacity style={styles.item}>
                <Image style={styles.img} source={{uri:data.images.medium}}></Image>
                <View>
                    <Text style={styles.tit}>名称：{data.title}</Text>
                    <Text style={styles.ml}>演员：{
                        data.casts.map(function (value) {
                            return value.name+" "
                        })
                    }</Text>
                    <Text style={styles.ml}>评分：{data.rating.average}</Text>
                    <Text style={styles.ml}>时间：{data.year}</Text>
                    <Text style={styles.ml}>标签：{
                        data.genres.map(function (value) {
                            return value+" "
                        })
                    }</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        _this = this;
        return(
            <View style={styles.container}>
                {
                    this.state.isShow?<View style={{flex:1}}>
                        <View style={styles.tt}>
                            <TextInput onChangeText={(txt)=>this.setState({text:txt})} style={styles.input} placeholder={"搜索电影"}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={{/*()=>this.jumpToNext()*/}}>
                                <Text style={styles.font}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                        />
                    </View>:<ActivityIndicator size={"large"} style={{marginTop:200}}/>
                }
            </View>
        )
    }
}
var _this1;
class secPage extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged:(oldData,newData)=>oldData!=newData
        })
        this.state = {
            dataSource:ds,
            isShow:false,
        }
    }
    getData(path){
        fetch("https://api.douban.com/v2/movie/search?q="+path)
            .then((res)=>res.json())
            .then((resJson)=>{
                console.log(resJson.subjects);
                var ds = new ListView.DataSource({
                    rowHasChanged:(oldData,newData)=>oldData!=newData
                })
                this.setState({
                    dataSource:ds.cloneWithRows(resJson.subjects),
                    isShow:true
                })
            })
            .catch((err)=>console.log(err))
    }
    componentDidMount () {
        this.getData(this.props.text);
    }
    /*showDetail(title,alt){
        this.props.navigator.push({
            title:title,
            component:TextView,
            passProps:{
                url:alt
            }
        })
    }*/
    _renderRow(data){
        return(
            <TouchableOpacity style={styles.item} onPress={()=>_this1.showDetail(data.title,data.alt)}>
                <Image style={styles.img} source={{uri:data.images.medium}}></Image>
                <View style={{justifyContent:"space-between",height:85}}>
                    <Text style={styles.tit}>名称：{data.title}</Text>
                    <Text numberOfLines={1} style={styles.ml}>演员：{
                        data.casts.map(function (value) {
                            return value.name+" "
                        })
                    }</Text>
                    <Text style={styles.ml}>评分：{data.rating.average}</Text>
                    <Text style={styles.ml}>时间：{data.year}</Text>
                    <Text style={styles.ml}>标签：{
                        data.genres.map(function (value) {
                            return value+" "
                        })
                    }</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        _this1 = this;
        return(
            <View style={{flex:1,marginTop:50}}>
                {
                    this.state.isShow?<ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                    />:<ActivityIndicator size={"large"} style={{marginTop:200}}/>
                }
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        marginTop:25,
        flex:1
    },
    item:{
        flexDirection:"row",
        padding:10,
    },
    img:{
        width:53,
        height:85,
    },
    tit:{
        fontSize:15,
        fontWeight:"700",
        marginLeft:10
    },
    ml:{
        marginLeft:10
    },
    tt:{
        padding:5,
        flexDirection:"row",
    },
    input:{
        flex:8,
        borderWidth:1,
        height:30,
        borderColor:"#ccc",
        paddingLeft:10,
        marginLeft:5
    },
    btn:{
        flex:2,
        height:30,
        borderWidth:1,
        borderColor:"#ccc",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:5,
        marginRight:5
    },

})
module.exports = firstPage;