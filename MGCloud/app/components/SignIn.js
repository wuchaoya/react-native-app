/**
 * 登陆
 */
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
import RNInteraction from '../common/RNInteraction'
let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretOff:require('../static/img/secret-off.png'),
            secretOn:require('../static/img/secret-on.png'),
            off:require('../static/img/off_icon.png'),
            on:require('../static/img/on_icon.png'),
            secureTextEntry:true,
            user:'',
            pass:'',
            signIn:true
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View >
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                            user:text},()=>{
                                this.setState({
                                    signIn: !(this.state.user.length!==0&&this.state.pass.length!==0)})
                            })}}
                        value={this.state.user}
                        style={styles.userInput}
                        placeholder="手机号/邮箱/用户名/和通行证"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#666"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.off}>
                        <Image style={{ width:24,height:24,}} source={this.state.off}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{width:width-80,justifyContent:'space-between'}}>
                    <TextInput
                        onChangeText={
                            (text) => {this.setState({pass:text},()=>{
                                this.setState({
                                    signIn: !(this.state.user.length!==0&&this.state.pass.length!==0)
                                })
                            })

                            }
                        }
                        value={this.state.pass}
                        style={styles.userInput}
                        placeholder="密码"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#666"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                        secureTextEntry={this.state.secureTextEntry}
                    />
                    <TouchableOpacity onPress={() =>{this.setState(
                        {secureTextEntry:!this.state.secureTextEntry} ) }} style={styles.secret}>
                        <Image style={{ width:24,height:24,}} source={this.state.secureTextEntry?this.state.secretOn:this.state.secretOff}></Image>
                    </TouchableOpacity>
                </View>
                <LoginButton text="登陆" disabled={this.state.signIn} style={{marginTop:20}}/>
                <LoginButton text="中国移动用户一键登录" disabled={false} style={{marginTop:12}} onPress={()=>{RNInteraction.sendSms()}}/>
                <View style={styles.foot}>
                    <Text onPress={() => navigate('SMSLanding')} style={styles.text}>短信登陆</Text>
                    <Text onPress={() => navigate('RestPass')}  style={styles.text}>忘记密码</Text>
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
        width:width-80,
        padding: 0,
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#444',
        color:'#999'
    },
    off:{
        position: 'absolute',
        right:0,
        height:44,
        justifyContent:'center'
    },
    secret:{
        position: 'absolute',
        top:0,
        right:0,
        height:44,
        justifyContent:'center',
        alignSelf:'flex-end'

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
