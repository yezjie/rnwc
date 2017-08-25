/*
* 工具组件
* 功能，返回设备窗口的宽高，封装一个http请求方式,loadind
* 需要组件
* Dimensions,
  ActivityIndicator
  外部传入内容：请求地址path，请求成功的回调succesCb,失败的回调failCb
* */

import React, {Component} from 'react';
import {
    Dimensions,
    ActivityIndicator
} from 'react-native';

var Util = {
    windowSize:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height
    },
    getData:function (path,succesCb,failCb) {
        fetch(path)
            .then((res)=>res.json())
            .then((resJson)=>{
                succesCb(resJson);
            })
            .catch((err)=>{
                failCb(err)
            })
    },
    loading:<ActivityIndicator size={"large"} style={{marginTop:200}}/>
}

module.exports = Util;