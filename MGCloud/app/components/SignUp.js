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
    Modal,
    ToastAndroid
} from 'react-native';
import CodeButton from '../components/CodeButton'
import HttpRequest from '../common/HttpRequest'
import  DeviceStorage from '../common/DeviceStorage'
import LoginButton from '../components/LoginButton'
import md5 from '../common/md5.min'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;


export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secretOff:require('../static/img/secret-on.png'),
            secretOn:require('../static/img/secret-off.png'),
            off:require('../static/img/off_icon.png'),
            on:require('../static/img/on_icon.png'),
            showList:false,
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
            loginErr:false,
            list:[],
            codeText:'获取验证码',
            isTime:false
        }
    }

    render() {
        const { navigate,goBack } = this.props.navigation;
        this.goBack=goBack
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

                                    loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)
                                },()=>{
                                    console.log(!this.state.isTime,this.state.user.length===0,)
                                    if(!this.state.isTime){
                                        this.setState({
                                            codeButtonDisabled:this.state.user.length===0,
                                        })
                                    }

                                    console.log(this.state.codeButtonDisabled+' codebutton')
                                }
                                    )

                            },()=>{

                                console.log(this.state.codeButtonDisabled+' codebutton')
                            })}}
                    />
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            user:'',
                        },()=>{
                            this.setState({
                                clerUser:this.state.user.length!==0?0:-100,
                                    codeButtonDisabled:true
                            })
                        })
                    }} style={[styles.clear,{right:this.state.user.length!==0?0:-100,}]}>
                        <Text style={{fontSize:10}}>╳</Text>
                    </TouchableOpacity>
                   {/* <TouchableOpacity
                        onPress={
                            ()=>{
                                this.setState({
                                    showList:!this.state.showList
                                },()=>{
                                    DeviceStorage.get('userList').then((v)=>{
                                        if(!v){
                                            v=[]
                                        }
                                        this.setState({
                                            list:v
                                        })
                                        console.log(v)
                                    })
                                })
                            }
                        }
                        style={styles.off}>
                        <Image style={{ width:24,height:24,}} source={this.state.showList?this.state.on:this.state.off}></Image>
                    </TouchableOpacity>*/}
                    <View style={[styles.list,this.state.showList?{top:44,}:{top:-10000}]}>
                        {this.state.list.map((item,i)=>{
                            return(
                                <TouchableOpacity
                                    key={i}
                                    onPress={()=>{
                                        this.setState({
                                            user:item,
                                            showList:!this.state.showList,
                                            clerUser:34,
                                            codeButtonDisabled:this.state.isTime?true:false
                                        })
                                    }}
                                    activeOpacity={0.8} style={styles.item}>
                                    <Text>{item}</Text>
                                    <Text onPress={
                                        ()=>{
                                            let  arr = this.state.list
                                            arr.splice(i,1)
                                            this.setState({
                                                list:arr
                                            },()=>{
                                                DeviceStorage.save('userList',arr)
                                            })
                                        }
                                    } style={{fontSize:10}}>╳</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
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
                        codeText={this.state.codeText}
                        onPress={()=>this.getCode()}
                        disabled={this.state.codeButtonDisabled}/>
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
                    <Text style={styles.text}>注册代表已阅读并接受<Text onPress={() => navigate('Pact',{url:'https://wap.myrunners.com/Public/registerAgreement',title:'使用协议'})} style={{color:'#83b233'}}>《使用协议》</Text></Text>
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
        //禁用状态不能再点击
        if(this.state.codeButtonDisabled){
            return
        }
        this.setState({
            codeButtonDisabled:true,
            isTime:true
        },()=>{
            let timeNumber =60
            let time = setInterval(()=>{
                this.setState({
                    codeText:'重新获取('+--timeNumber+')'
                })
                if(timeNumber==0){
                    clearInterval(time)
                    this.setState({
                        codeButtonDisabled:this.state.user.length==0?true:false,
                        codeText:'重新获取',
                        isTime:false
                    })
                }
            },1000)
        })
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
        if(!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)){
            ToastAndroid.show('请输入完整的注册的信息', ToastAndroid.SHORT);
            return
        }
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
                        this.goBack()

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
        color:'#666',

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
        right:0,
        justifyContent:'center',
        alignItems:'center',
    },
    list:{
        position: 'absolute',
        top:44,
        width:width-80,
        zIndex:22
    },
    item:{
        backgroundColor:'#ddd',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:44,
        paddingLeft:10,
        paddingRight:10
    }
});

