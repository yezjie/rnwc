/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

//引入tabbar支持包
import TabNavigator from 'react-native-tab-navigator';
var Movies = require("./ios_view/ios");
var Map = require("./ios_view/map");
var Reade = require("./ios_view/reade");
var SheZ = require("./ios_view/shezhi");

const TabNavigatorItem =TabNavigator.Item;

const TAB_NORMAL_1=require('./img/toilet.png');
const TAB_NORMAL_2=require('./img/reader.png');
const TAB_NORMAL_3=require('./img/movie.png');
const TAB_NORMAL_4=require('./img/set.png');

const TAB_PRESS_1=require('./img/toilet.png');
const TAB_PRESS_2=require('./img/reader.png');
const TAB_PRESS_3=require('./img/movie.png');
const TAB_PRESS_4=require('./img/set.png');

class Rnwc extends Component {

    constructor(){
        super();
        this.state={
            selectedTab:'Home',
        }
    }

    /**
     tab点击方法
     **/
    onPress(tabName){
        if(tabName){
            this.setState(
                {
                    selectedTab:tabName,
                }
            );
        }
    }
    /**
     渲染每项
     **/
    renderTabView(title,tabName,isBadge){
        var tabNomal;
        var tabPress;
        var main;
        switch (tabName) {
            case 'Home':
                tabNomal=TAB_NORMAL_1;
                tabPress=TAB_PRESS_1;
                main=<Map/>
                break;
            case 'Video':
                tabNomal=TAB_NORMAL_2;
                tabPress=TAB_PRESS_2;
                main=<Reade/>
                break;
            case 'Follow':
                tabNomal=TAB_NORMAL_3;
                tabPress=TAB_PRESS_3;
                main=<Movies/>
                break;
            case 'Mine':
                tabNomal=TAB_NORMAL_4;
                tabPress=TAB_PRESS_4;
                main=<SheZ/>
                break;
            default:

        }
        return(
            <TabNavigatorItem
                title={title}
                renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
                renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
                selected={this.state.selectedTab===tabName}
                selectedTitleStyle={{color:'#f85959'}}
                onPress={()=>this.onPress(tabName)}
                renderBadge={()=>isBadge?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null}
            >
                {main}
            </TabNavigatorItem>
        );
    }

    /**
     自定义tabbar
     **/
    tabBarView(){
        return (
            <TabNavigator
                tabBarStyle={styles.tab}
            >
                {this.renderTabView('头条','Home',false)}
                {this.renderTabView('视频','Video',false)}
                {this.renderTabView('关注','Follow',false)}
                {this.renderTabView('我的','Mine',false)}
            </TabNavigator>
        );
    }


    render() {
        var tabBarView=this.tabBarView();
        return (
            <View style={styles.container}>
                {tabBarView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tab:{
        height: 52,
        alignItems:'center',
        backgroundColor:'#f4f5f6',
    },
    tabIcon:{
        width:25,
        height:25,
    },
    badgeView:{
        width:22,
        height:14 ,
        backgroundColor:'#f85959',
        borderWidth:1,
        marginLeft:10,
        marginTop:3,
        borderColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
    },
    badgeText:{
        color:'#fff',
        fontSize:8,
    }
});

AppRegistry.registerComponent('rnwc',()=>Rnwc);
