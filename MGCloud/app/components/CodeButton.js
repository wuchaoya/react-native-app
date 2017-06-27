import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native';

export default class CodeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TouchableHighlight style={[styles.code,{backgroundColor:this.props.disabled?'#444':'#83b233'}]}>
                <Text style={{color:this.props.disabled?'#2c2c2c':'#fff'}}>获取验证码</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    code:{
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:40,
        backgroundColor:'#83b233',
        borderRadius:6,
        position:'absolute',
        right:0,
        alignSelf:'center'
    }
});


