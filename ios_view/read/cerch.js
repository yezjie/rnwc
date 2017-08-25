import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';


class Search extends Component{
    constructor(props){
        super(props)
    }
    /*showList(){
        this.props.navigator.push({
            title:"互联网",
            component:List,
            passProps:{
                type:"it",
                text:"互联网"
            }
        })
    }*/
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={"搜索"}
                    placeholderTextColor={"#5c5c5c"}
                    returnKeyType={"search"}
                    onSubmitEditing={()=>this.props.navigate('myList', { type: 'it' ,navigate:this.props.navigate})}
                    underlineColorAndroid='transparent'
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
        marginTop:5
    },
    input:{
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:3,
        height:37,
        padding:10
    }
})
module.exports = Search;