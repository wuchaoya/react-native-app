/**
 * 登陆注册按钮组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.button,{backgroundColor:this.props.disabled?'#444':'#83b233'},this.props.style]}>

                    <Text style={{color:this.props.disabled?'#2c2c2c':'#fff',fontSize:14}}>{this.props.text}</Text>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        height:40,
        width:width-80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        borderRadius:20
    }

});


