import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    NavigatorIOS,
    RefreshControl,
    ScrollView
} from 'react-native';

var Search = require("./read/cerch");
var Recommend = require("./read/recom");
var Topic = require("./read/topic");
var Category = require("./read/category");
var Util = require("./component/util");

class Hr extends Component{
    render(){
        return(
            <View style={styles.hr}></View>
        )
    }
}

class Read extends Component{
    constructor(){
        super();
        this.state={
            recommend:null,
            hotTopic:null,
            category:null,
            other:null,
            isShowLoading:true
        }
    }
    getData(){
        var path = "http://123.57.39.116:3000/data/read?type=config";
        Util.getData(path,function (res) {
            console.log(res);
            this.setState({
                isShowLoading:false,
                recommend:res.data.recommendTopic,
                hotTopic:res.data.hotTopic,
                category:res.data.category,
                other:res.data.other
            })
        }.bind(this),function (err) {
            console.log(err);
            alert("请求出错")
        })
    }
    componentDidMount(){
        this.getData();
    }
    _onRefresh(){
        this.getData()
    }
    render(){
        return(
            <View style={styles.container}>
                <Search navigator={this.props.navigator}></Search>
                <Hr/>
                {
                    this.state.isShowLoading?
                        Util.loading:
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    title={"下拉刷新"}
                                    refreshing={false}
                                    onRefresh={()=>this._onRefresh()}
                                />
                            }
                        >
                            <Recommend
                                data={this.state.recommend}
                                navigator={this.props.navigator}/>
                            <Hr/>

                            <Topic
                                data={this.state.hotTopic}
                                title="热门专题"
                                type="it"
                                navigator={this.props.navigator}/>
                            <Hr/>

                            <Category
                                data={this.state.category}
                                navigator={this.props.navigator}/>
                            <Hr/>

                            <Topic
                                data={this.state.other}
                                title="清新一刻"
                                type="cookies"
                                navigator={this.props.navigator}/>
                        </ScrollView>
                }

            </View>
        )
    }
}

class ReadNav extends Component{
    render(){
       return(
           <View style={[styles.container,{marginTop:25}]}>
               <NavigatorIOS
                   style={styles.container}
                   initialRoute={{
                       title:"阅读",
                       component:Read,
                       navigationBarHidden:true
                   }}
               />
           </View>
       )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:20,
    },
    hr:{
        height:1,
        marginTop:5,
        marginBottom:5,
        backgroundColor:"#333",
        opacity:0.1
    }
})
module.exports = ReadNav;