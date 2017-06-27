/**
 * 找回密码
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
import HeadNav from '../components/HeadNav'
import CodeButton from '../components/CodeButton'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

import LoginButton from '../components/LoginButton'
export default class SMSLanding extends Component {
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
            pass:''
        }
    }
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{flex:1}}>
                <HeadNav color="#2d2d2d" onPress={() => goBack()}/>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>重置密码</Text>
                    </View>
                    <View >
                        <TextInput
                            style={styles.userInput}
                            placeholder="手机号/邮箱/用户名/和通行证"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#666"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            value={this.state.user}
                            onChangeText={(text) => {
                                this.setState({
                                    user:text},()=>{
                                    this.setState({
                                        codeButtonDisabled:this.state.user.length===0,
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <TouchableOpacity style={styles.off}>
                            <Image style={{ width:24,height:24,}} source={this.state.off}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={[styles.userInput,{paddingRight:200,}]}
                            placeholder="验证码"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#666"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.code}
                            onChangeText={(text) => {
                                this.setState({
                                    code:text},()=>{
                                    this.setState({
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <CodeButton disabled={this.state.codeButtonDisabled}/>
                    </View>
                    <View style={{width:width-80,justifyContent:'space-between'}}>
                        <TextInput
                            style={styles.userInput}
                            placeholder="密码"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#666"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.pass}
                            onChangeText={(text) => {
                                this.setState({
                                    pass:text},()=>{
                                    this.setState({
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <TouchableOpacity onPress={() =>{this.setState(
                            {secureTextEntry:!this.state.secureTextEntry} ) }} style={styles.secret}>
                            <Image style={{ width:24,height:24,}} source={this.state.secureTextEntry?this.state.secretOn:this.state.secretOff}></Image>
                        </TouchableOpacity>
                    </View>
                    <LoginButton text="确定" disabled={this.state.loginButtonDisabled} style={{marginTop:20}}/>
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
        justifyContent:'center',
        marginTop:15
    },
    text:{
        color:'#666',
        fontSize:13
    },
    code:{
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:44,
        backgroundColor:'#83b233',
        borderRadius:6
    },
    titleText:{
        fontSize:14,
        color:'#83b233',
        fontWeight:'800'
    },
    title:{
        height:44,
        justifyContent:'center',
        alignItems:'center'
    }
});

