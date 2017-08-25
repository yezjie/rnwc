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
import { StackNavigator } from 'react-navigation';
var Search = require("./read/cerch");
var Recommend = require("./read/recom");
var Topic = require("./read/topic");
var Category = require("./read/category");
var Util = require("./component/util");

var List = require("./read/list");
var webView = require('./component/webview')
class Hr extends Component{
    render(){
        return(
            <View style={styles.hr}></View>
        )
    }
}

class Readz extends Component{
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
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
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Search navigate={ navigate }></Search>
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
                                />
                            <Hr/>

                            <Topic
                                data={this.state.hotTopic}
                                title="热门专题"
                                type="it"
                                />
                            <Hr/>

                            <Category
                                data={this.state.category}
                                />
                            <Hr/>

                            <Topic
                                data={this.state.other}
                                title="清新一刻"
                                type="cookies"
                                />
                        </ScrollView>
                }

            </View>
        )
    }
}

const Read = StackNavigator({
    myRead: { screen: Readz },
    myList: { screen: List },
    myWebView:{ screen: webView }
});
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
module.exports = Read;