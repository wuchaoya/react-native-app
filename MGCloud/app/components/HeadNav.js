/**
 * 头部导航条组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    StatusBar,
    DeviceEventEmitter,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
export default class HeadNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    _renderLeft(left,press){
           if(left!==null &&left !==undefined){
               return (left)

           }
           if(left===null){
               return (<Image/>)
           }

            return (  <TouchableOpacity    onPress={press}>
                <Image  style={styles.leftImg} source={require('../static/img/back_icon.png') }></Image>
            </TouchableOpacity>)

    }
    _renderRight(right){
        return (right)
    }
    render() {
        return (
            <View
                style={[styles.container,this.props.style,this.props.color===null?{}:(this.props.color!==undefined?{backgroundColor:this.props.color}:{ backgroundColor:'#000',}),]}>
                <View style={{
                marginLeft:10,width:60}}>{
                   this._renderLeft(this.props.left,this.props.onPress)
                }

                </View>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'800'}}>{this.props.header}</Text>
                <View style={{marginRight:10,width:60}}>
                    {this._renderRight(this.props.right)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height:64,
        justifyContent:'space-between',
        alignItems: 'center',
        paddingTop:StatusBar.currentHeight,

    },
    textColor:{
        color:'#fff'
    },
    leftImg:{
        height:33,
        width:33
    }
});

