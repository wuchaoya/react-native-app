import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TextInput,
    TouchableOpacity
} from 'react-native';
import LoginButton from '../components/LoginButton'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretOff:require('../static/img/secret-off.png'),
            secretOn:require('../static/img/secret-on.png'),
            off:require('../static/img/off_icon.png'),
            on:require('../static/img/on_icon.png'),
            secureTextEntry:true
        }
    }
    render() {
        console.log('渲染了')
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.userInput}
                    placeholder="手机号/邮箱/用户名/和通行证"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#666"
                    selectionColor="#999"
                    maxLength={18}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.userInput}
                    placeholder="密码"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#666"
                    selectionColor="#999"
                    maxLength={18}
                    autoCorrect={false}
                    secureTextEntry={this.state.secureTextEntry}
                />
                <TouchableOpacity style={styles.off}>
                    <Image style={{ width:24,height:24,}} source={this.state.off}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{this.setState(
                    {secureTextEntry:!this.state.secureTextEntry} ) }} style={styles.secret}>
                    <Image style={{ width:24,height:24,}} source={this.state.secureTextEntry?this.state.secretOn:this.state.secretOff}></Image>
                </TouchableOpacity>
                <LoginButton text="登陆" backgroundColor="#444" color="#2c2c2c" style={{marginTop:20}}/>
                <LoginButton text="中国移动用户一键登录" backgroundColor="#83b233" color="#fff" style={{marginTop:12}}/>
                <View style={styles.foot}>
                    <Text style={styles.text}>短信登陆</Text>
                    <Text style={styles.text}>忘记密码</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#2d2d2d',
        paddingLeft:40,
        paddingRight:40
    },
    userInput:{
        padding: 0,
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#444',
        color:'#999'
    },
    off:{
        position: 'absolute',
        right:40,
        height:44,
        justifyContent:'center'
    },
    secret:{
        position: 'absolute',
        top:42,
        right:40,
        height:44,
        justifyContent:'center'
    },
    foot:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    },
    text:{
        color:'#ddd',
        fontSize:14
    }
});

