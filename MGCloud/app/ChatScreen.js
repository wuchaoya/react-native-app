/**
 * Created by Administrator on 2017/3/31 0031.
 */
'use strict'
import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';
class ChatScreen extends Component{
    static navigationOptions = {
        title:'Chat with Lucy',
    };
    render(){
        const {params} = this.props.navigation.state;
        return(
            <View>

                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}
export default ChatScreen;  