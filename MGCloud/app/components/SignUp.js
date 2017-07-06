/**
 * 注册
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
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import CodeButton from '../components/CodeButton'
import HttpRequest from '../common/HttpRequest'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

import LoginButton from '../components/LoginButton'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretOff:require('../static/img/secret-off.png'),
            secretOn:require('../static/img/secret-on.png'),
            off:require('../static/img/off_icon.png'),
            on:require('../static/img/on_icon.png'),
            secureTextEntry:true,
            codeButtonDisabled:true,
            loginButtonDisabled:true,
            user:'',
            code:'',
            pass:'',
            clerUser:-100,
            clerPass:-100,
            clerCode:-100,
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View >
                    <TextInput
                        style={styles.userInput}
                        placeholder="请输入未注册的手机号"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                        value={this.state.user}
                        onChangeText={(text) => {
                            this.setState({
                                user:text},()=>{
                                this.setState({
                                    clerUser:this.state.user.length!==0?34:-100,
                                    codeButtonDisabled:this.state.user.length===0,
                                    loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                            })}}
                    />
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            user:'',
                        },()=>{
                            this.setState({
                                clerUser:this.state.user.length!==0?34:-100,
                            })
                        })
                    }} style={[styles.clear,{right:this.state.clerUser,}]}>
                        <Text style={{fontSize:10}}>╳</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.off}>
                        <Image style={{ width:24,height:24,}} source={this.state.off}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                        style={[styles.userInput,{paddingRight:200}]}
                        placeholder="验证码"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                        value={this.state.code}
                        onChangeText={(text) => {
                            this.setState({
                                code:text},()=>{
                                this.setState({
                                    clerCode :this.state.code.length!==0?120:-100,
                                    loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                            })}}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                code:'',
                            },()=>{
                                this.setState({
                                    clerCode :this.state.code.length!==0?120:-100,
                                })
                            })
                        }}
                        style={[styles.clear,{right:this.state.clerCode,}]}>
                        <Text style={{fontSize:10}}>╳</Text>
                    </TouchableOpacity>
                    <CodeButton
                        onPress={()=>this.getCode()}
                        disabled={this.state.codeButtonDisabled}
                    />
                </View>


                <View style={{width:width-80,justifyContent:'space-between'}}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="密码"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                        secureTextEntry={this.state.secureTextEntry}
                        value={this.state.pass}
                        onChangeText={(text) => {
                            this.setState({
                                pass:text},()=>{
                                this.setState({
                                    clerPass:this.state.pass.length!==0?34:-100,
                                    loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                            })}}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                pass:'',
                            },()=>{
                                this.setState({
                                    clerPass:this.state.pass.length!==0?34:-100,
                                })
                            })
                        }}
                        style={[styles.clear,{right:this.state.clerPass,}]}>
                        <Text style={{fontSize:10}}>╳</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{this.setState(
                        {secureTextEntry:!this.state.secureTextEntry} ) }} style={styles.secret}>
                        <Image style={{ width:24,height:24,}} source={this.state.secureTextEntry?this.state.secretOn:this.state.secretOff}></Image>
                    </TouchableOpacity>
                </View>
                <LoginButton
                    onPress={()=>this.loginRegister()}
                    text="注册并登录"
                    disabled={this.state.loginButtonDisabled}
                    style={{marginTop:20}}
                />
                <View style={styles.foot}>
                    <Text style={styles.text}>注册代表已阅读并接受<Text onPress={() => navigate('Pact')} style={{color:'#83b233'}}>《使用协议》</Text></Text>
                </View>
            </View>
        );
    }
    getCode(){
        HttpRequest.getVerityCode({
                phone:this.state.user,
                businessID:0
            },
            (response)=>{
            },
            (error)=>{

            }
        )
    }
    loginRegister(){
        HttpRequest.loginRegister(
            {
                phone:this.state.user,
                password:this.state.pass,
                veritycode:this.state.code,
                ip:'',
                location:''

            },
            (response)=>{
            },
            (error)=>{

            }
        )
    }
    componentWillMount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
        paddingLeft:40,
        paddingRight:40
    },
    userInput:{
        width:width-80,
        padding: 0,
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        color:'#666'
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
        justifyContent:'center',
        marginTop:15
    },
    text:{
        color:'#999',
        fontSize:13
    },
    clear:{
        width:44,
        height:44,
        position: 'absolute',
        right:34,
        justifyContent:'center',
        alignItems:'center'
    }
});

