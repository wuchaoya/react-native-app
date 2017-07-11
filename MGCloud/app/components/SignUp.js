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
    TouchableHighlight,
    Modal
} from 'react-native';
import TimerButton from '../components/test'
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
            isShow:false,
            loginErr:false
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

                            },()=>{
                                console.log(this.state.codeButtonDisabled+' codebutton')
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
                    <TimerButton
                        timerCount={60}
                        disableColor="#aaa"
                        buttonDisabledColor="#ccc"
                        selfEnable={!this.state.codeButtonDisabled}
                        textStyle={{color: '#fff'}}
                        onclick={(start)=>{
                            console.log('什么规')
                           start(true)
                        }}/>
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
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.isShow}
                    onRequestClose={()=>{
                    }
                    }
                    style={{backgroundColor:'rgba(0,0,0,0.7)',flex:1}}>
                    <View
                        style={{
                            flex:1,backgroundColor:'rgba(0,0,0,0.7)',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        {this.state.loginErr?
                            <View style={{width:530/2,height:130,backgroundColor:'#fff',borderRadius:6,justifyContent:'center',alignItems:'center'}}>
                                <View style={{height:130/2,width:530/2,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                                    <Text>验证码错误</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({
                                            isShow:false,
                                            loginErr:false
                                        })
                                    }}
                                    style={{height:130/2,width:530/2,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#83b233'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{width:100,height:100,backgroundColor:'#fff',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image style={{width:27,height:29}} source={require('../static/img/loading.gif')}/>
                                <Text style={{fontSize:10,marginTop:6,letterSpacing:1000}}>注册中</Text>
                            </View>
                        }
                    </View>

                </Modal>
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
        this.setState({
            isShow:true
        })
        HttpRequest.loginRegister(
            {
                phone:this.state.user,
                password:this.state.pass,
                veritycode:Number(this.state.code),
                ip:'',
                location:''

            },
            (response)=>{
                console.log(response)
                if(response.resultCode==0){
                    this.setState({
                        isShow:false
                    },()=>{
                        alert('注册成功')
                    })
                }
                else {
                    this.setState({
                        loginErr:true
                    })
                }
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

