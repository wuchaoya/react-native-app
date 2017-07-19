/**
 * 我的头部组件
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TouchableHighlight,
    DeviceEventEmitter,
    BackHandler,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import TextConst from '../const/TextConst'

export default class UserHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'未登陆',
            userIcon:require('../static/img/user.png')
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() =>{BackHandler.exitApp()}}  style={styles.back} >
                    <Image  style={{height:33,width:33}} source={require('../static/img/back_icon.png')} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigate('Settings')}  style={styles.iconSetup} >
                    <Image  style={{height:22,width:22}} source={require('../static/img/setting_icon.png')} />
                </TouchableHighlight>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    if(!global.userId){
                        navigate('Login',{route:''})
                    }
                }} style={styles.headImgBorder}>
                    <Image style={styles.headImg} source={this.state.userIcon}/>
                </TouchableOpacity>
                <Text onPress={() => {
                    if(!global.userId){
                        navigate('Login',{route:''})
                    }
                }}  style={styles.userNameText}>{this.state.userName}</Text>
            </View>
        );
    }

    componentDidMount(){
        if(global.userId){
            this.setState({
                userName:global.userInfo.loginAccountName,
                userIcon:require('../static/img/user_head_icon.jpg')
            },()=>{
                console.log('当前已经登陆')
            })
        }
        this.LoginStatus = DeviceEventEmitter.addListener('LoginStatus',(listenerMsg) => {
            this.setState({
                userName:listenerMsg.userName,
                userIcon:require('../static/img/user_head_icon.jpg')
            },()=>{
                console.log('当前已经登陆')
            })
        });
        this.LoginOut = DeviceEventEmitter.addListener('LoginOut',(listenerMsg) => {
            this.setState({
                userName:'未登录',
                userIcon:require('../static/img/user.png')
            },()=>{
                console.log('当前已经登陆')
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:ColorStyle.colorBlack,
        height:160,
        justifyContent: 'center',
        alignItems:'center',
        // borderWidth:1,
        borderColor:ColorStyle.colorGray,
    },
    back:{
        position: 'absolute',
        top: 32,
        left:12,
        width:33,
        height:33
    },
    iconSetup:{
        position: 'absolute',
        top: 32,
        right:12,
        width:22,
        height:22,
    },
    headImgBorder:{
        height:63,
        width:63,
        borderRadius:63/2,
        borderWidth:3,
        borderColor:ColorStyle.colorWhite,
        justifyContent: 'center',
        alignItems:'center',
        shadowColor:'red',
        shadowOffset:{width:1,height:1,},
        shadowOpacity:0.5,
        shadowRadius:1
    },
    headImg:{
        height:60,
        width:60,
        borderRadius:30

    },
    userNameText:{
        color:ColorStyle.colorWhite,
        marginTop:9,
        fontSize:15,
       /* textShadowOffset:{width:1,hegith:1},
        textShadowColor:'red',*/

    }
});
