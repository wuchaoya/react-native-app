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
    TouchableOpacity,
    Modal,
    ToastAndroid
} from 'react-native';
import LoginButton from '../components/LoginButton'
import RNInteraction from '../common/RNInteraction'
import Empty from '../components/Empty'
import md5 from '../common/md5.min'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
import HttpRequest from '../common/HttpRequest'
import  DeviceStorage from '../common/DeviceStorage'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretOff: require('../static/img/secret-on.png'),
            secretOn: require('../static/img/secret-off.png'),
            off: require('../static/img/off_icon.png'),
            on: require('../static/img/on_icon.png'),
            secureTextEntry: true,
            showList: false,
            user: '',
            pass: '',
            signIn: true,
            clerUser: -100,
            clerPass: -100,
            onLogin: false,//是否弹出弹框
            loginErr: false,//是否登陆失败
            list: [],
            isTocuhSMSLanding:false,
            isTocuhRestPass:false
        }
    }

    touchSMSLanding(){
        if(this.state.isTocuhSMSLanding){
            return
        }
        this.setState({
            isTocuhSMSLanding:true
        },()=>{
            this.props.navigation.navigate('SMSLanding')
            setTimeout(()=>{
                this.setState({
                    isTocuhSMSLanding:false
                })
            },1000)
        })
    }
    touchRestPass(){
        if(this.state.isTocuhRestPass){
            return
        }
        this.setState({
            isTocuhRestPass:true
        },()=>{
            this.props.navigation.navigate('RestPass')
            setTimeout(()=>{
                this.setState({
                    isTocuhRestPass:false
                })
            },1000)
        })
    }


    render() {

        const {navigate, goBack} = this.props.navigation;
        this.goBack = goBack
        return (
            <View style={styles.container}>
                <View >
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                user: text
                            }, ()=> {
                                this.setState({
                                    clerUser: this.state.user.length !== 0 ? 34 : -100,
                                    signIn: !(this.state.user.length !== 0 && this.state.pass.length !== 0)
                                })
                            })
                        }}
                        value={this.state.user}
                        style={styles.userInput}
                        placeholder="手机号/邮箱/用户名/和通行证"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                    />
                    <TouchableOpacity onPress={()=> {
                        this.setState({
                            user: '',
                        }, ()=> {
                            this.setState({
                                clerUser: this.state.user.length !== 0 ? 34 : -100,
                            })
                        })
                    }} style={[styles.clear, {right: this.state.clerUser,}]}>
                        <Text style={{fontSize: 10}}>╳</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        ()=> {
                            this.setState({
                                showList: !this.state.showList
                            }, ()=> {
                                DeviceStorage.get('userList').then((v)=> {
                                    if (!v) {
                                        v = []
                                    }
                                    this.setState({
                                        list: v
                                    })
                                    console.log(v)
                                })
                            })

                        }
                    } style={styles.off}>
                        <Image style={{width: 24, height: 24,}}
                               source={this.state.showList ? this.state.on : this.state.off}></Image>
                    </TouchableOpacity>
                    <View style={[styles.list, this.state.showList ? {top: 44,} : {top: -10000}]}>
                        {this.state.list.map((item, i)=> {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={()=> {
                                        this.setState({
                                            user: item,
                                            showList: !this.state.showList,
                                            clerUser: 34
                                        })
                                    }}
                                    activeOpacity={0.8} style={styles.item}>
                                    <Text>{item}</Text>
                                    <Text onPress={
                                        ()=> {
                                            let arr = this.state.list
                                            arr.splice(i, 1)
                                            this.setState({
                                                list: arr
                                            }, ()=> {
                                                DeviceStorage.save('userList', arr)
                                            })
                                        }
                                    } style={{fontSize: 10}}>╳</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={{width: width - 80, justifyContent: 'space-between'}}>
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.setState({pass: text}, ()=> {
                                    this.setState({
                                        clerPass: this.state.pass.length !== 0 ? 34 : -100,
                                        signIn: !(this.state.user.length !== 0 && this.state.pass.length !== 0)
                                    })
                                })

                            }
                        }
                        value={this.state.pass}
                        style={styles.userInput}
                        placeholder="密码"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                        selectionColor="#999"
                        maxLength={18}
                        autoCorrect={false}
                        secureTextEntry={this.state.secureTextEntry}
                    />
                    <TouchableOpacity
                        onPress={()=> {
                            this.setState({
                                pass: '',
                            }, ()=> {
                                this.setState({
                                    clerPass: this.state.pass.length !== 0 ? 34 : -100,
                                })
                            })
                        }}
                        style={[styles.clear, {right: this.state.clerPass,}]}>
                        <Text style={{fontSize: 10}}>╳</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.setState(
                            {secureTextEntry: !this.state.secureTextEntry})
                    }} style={styles.secret}>
                        <Image style={{width: 24, height: 24,}}
                               source={this.state.secureTextEntry ? this.state.secretOn : this.state.secretOff}></Image>
                    </TouchableOpacity>
                </View>
                <LoginButton
                    text="登录"
                    disabled={this.state.signIn}
                    style={{marginTop: 20}}
                    onPress={()=> {

                        this.login()

                    }}
                />
                <LoginButton text="中国移动用户一键登录" disabled={false} style={{marginTop: 12}} onPress={()=> {
                     this.setState({
                         onLogin: true
                     });
                    // 网络请求,获取验证码
                    RNInteraction.sendSms('').then((result)=> {
                        // 获取一键登录需要提交的验证码(result)
                        console.log('短信发送返回 成功:' + result);
                        // 开始一键登录
                        this.loginQuick(result);
                    }).catch((error)=> {
                        console.log('短信发送返回 失败:' + error);
                        this.setState({
                            onLogin: false
                        });
                    });
                }}/>
                <View style={styles.foot}>
                    <Text onPress={() => this.touchSMSLanding()} style={styles.text}>短信登录</Text>
                    <Text onPress={() => this.touchRestPass()} style={styles.text}>忘记密码</Text>
                </View>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.onLogin}
                    onRequestClose={()=> {
                    }
                    }
                    style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}}>
                    <View
                        style={{
                            flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {this.state.loginErr ?
                            <View style={{
                                width: 530 / 2,
                                height: 130,
                                backgroundColor: '#fff',
                                borderRadius: 6,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    height: 130 / 2,
                                    width: 530 / 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ddd'
                                }}>
                                    <Text>账号或密码错误</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.setState({
                                            onLogin: false,
                                            loginErr: false
                                        })
                                    }}
                                    style={{
                                        height: 130 / 2,
                                        width: 530 / 2,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{color: '#83b233'}}>再试一次</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#fff',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image style={{width: 27, height: 29}} source={require('../static/img/loading.gif')}/>
                                <Text style={{fontSize: 10, marginTop: 6, letterSpacing: 1000}}>登录中</Text>
                            </View>
                        }
                    </View>

                </Modal>
            </View>
        );
    }

    login() {
        if (!(this.state.user.length !== 0 && this.state.pass.length !== 0)) {
            ToastAndroid.show('请输入您的账号密码', ToastAndroid.SHORT);
            return
        }
        this.setState({
            onLogin: true
        });
        HttpRequest.login({
                phone: this.state.user,
                //先不加密，因为我以前注册的账号都没加密
                password:this.state.pass,
                ip: '',
                position: '',
                DeviceType: ''
            },
            (response)=> {
                console.log(response)
                if (response.resultCode == 0) {
                    if (response.authenticateRsp.userInfo.identityID) {
                        global.userInfo = response.authenticateRsp;
                        global.userId = response.authenticateRsp.userInfo.identityID
                    }
                    let arr = []
                    DeviceStorage.get('userList').then((v)=> {
                        console.log(v)
                        if (v) {
                            arr = v

                        }
                        else {
                            arr = []
                        }
                        if (arr.indexOf(this.state.user) == -1) {
                            arr.push(this.state.user)

                        }
                        DeviceStorage.save('userList', arr).then(
                            this.setState({
                                onLogin: false
                            }, ()=> {

                                DeviceEventEmitter.emit('LoginStatus', {userName: this.state.user})
                                this.goBack()
                            })
                        )
                    })
                }
                else {
                    this.setState({
                        loginErr: true
                    })
                }
            },
            (error)=> {

            }
        )
    }

    loginQuick(veritycode) {
        // 延时2秒处理
        this.timer = setTimeout(
            () => {
                console.log('收到短信发送成功请求,延时2秒处理后续逻辑');
                HttpRequest.loginQuick(
                    {
                        veritycode: veritycode,
                        phone: ''
                    },
                    (response)=> {
                        if (response.resultCode == 0) {
                            if (response.implicitLoginRsp.userInfo.identityID) {
                                global.userInfo = response.implicitLoginRsp;
                                global.userId = response.implicitLoginRsp.userInfo.identityID;
                                DeviceEventEmitter.emit('LoginStatus', {userName: this.state.user});
                                this.goBack()
                            } else {
                                this.setState({
                                    loginErr: true
                                })
                            }
                        }
                        else {
                            this.setState({
                                loginErr: true
                            })
                        }
                    },
                    (error)=> {
                        this.setState({
                            loginErr: true
                        })
                    }
                )

            },
            1000 * 2
        );
    }

    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写

        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingLeft: 40,
        paddingRight: 40
    },
    userInput: {
        width: width - 80,
        padding: 0,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#666'
    },
    off: {
        position: 'absolute',
        right: 0,
        height: 44,
        justifyContent: 'center'
    },
    secret: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 44,
        justifyContent: 'center',
        alignSelf: 'flex-end'

    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    text: {
        color: '#83b233',
        fontSize: 14
    },
    clear: {
        width: 44,
        height: 44,
        position: 'absolute',
        right: 34,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        position: 'absolute',
        top: 44,
        width: width - 80,
        zIndex: 22
    },
    item: {
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10
    }

});

