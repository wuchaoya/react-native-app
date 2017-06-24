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
export default class LoginInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            off:require('../static/img/off_icon.png'),
            secret:require('../static/img/secret-on.png'),
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
                        <Image style={{ width:24,height:24,}} source={this.state.secret}></Image>
                </TouchableOpacity>

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
    }
});

