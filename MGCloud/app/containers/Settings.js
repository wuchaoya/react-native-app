/**
 * 设置
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity,
    Modal,
    BackAndroid
} from 'react-native';
import HeadNav from '../components/HeadNav'
import TransparentStatusBar    from '../components/TransparentStatusBar'
import RNInteraction from '../common/RNInteraction'

let url ='https://wap.myrunners.com/Public/registerAgreement'
export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow:false,
            isLogin:global.userId?true:false,
            isTouchPact:false,
            isTouchMGServer:false
        }
    }

    touchSetTimeOut(navName,name,obj){
        if(this.state[name]){
            return
        }
        this.setState({
            name:true,
        },()=>{
            this.props.navigation. navigate(navName,obj)
            setTimeout(()=>{
                this.setState({
                    name:false
                })
            },1000)

        },)

    }
    touchMGServer(){
        if(this.state.isTouchMGServer){
            return
        }
        this.setState({
            isTouchMGServer:true
        },()=>{
             RNInteraction.openMGServer(global.userId?global.userId:null)
            setTimeout(()=>{
                this.setState({
                    isTouchMGServer:false
                })
            })

        })
    }
    render() {
        const { goBack,navigate } = this.props.navigation;
        this.goBack = goBack

        return (
            <View style={styles.container}>
                <TransparentStatusBar/>
                <HeadNav header="设置"  onPress={() => goBack()} />
                <View style={{  paddingLeft:12,paddingRight:12,backgroundColor:'#fff',}}>
                    <TouchableOpacity
                        activeOpacity={0.9} style={styles.conter} onPress={() => this.touchSetTimeOut('Pact','isTouchPact',{url:url,title:'用户服务协议'})}>
                        <Text style={styles.text} >用户服务协议</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.touchMGServer()}
                        activeOpacity={0.9}
                        style={[styles.conter,{marginTop:0,borderTopWidth: 1,borderTopColor:'#ededed'}]}>
                        <Text style={styles.text}>联系客服</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                </View>
                {this.state.isLogin? <TouchableOpacity
                    onPress={()=>{
                       this.setState({
                           isShow:true
                       })
                    }}
                    style={{ justifyContent:'center',alignItems:'center',height:53,marginTop:6,backgroundColor:'#fff',}}>
                    <Text style={styles.text}>退出登录</Text>
                </TouchableOpacity>:null}
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
                        <View style={{width:265,height:132,backgroundColor:'#f2f2f2',borderRadius:6}}>
                            <View
                                style={{
                                    height:72,width:265,
                                    justifyContent:'center',alignItems:'center',
                                }}>
                                <Text>是否退出登录</Text>
                            </View>
                            <View style={{
                                borderTopWidth:1,
                                height:60,
                                borderTopColor:'#ddd',
                                flexDirection:'row',
                                alignItems:'center'
                            }}>
                                <TouchableOpacity
                                    onPress={()=>this.siginOut(false)}
                                    style={{width:265/2,height:40,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#ddd'}}>
                                    <Text>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.siginOut(true)}
                                    style={{width:265/2,height:40,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#83b233'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
    siginOut(isOut){

        this.setState({
            isShow:false
        },()=>{
            if(isOut){
                global.userId=null
                DeviceEventEmitter.emit('LoginOut',{userName:this.state.user} )
               this.goBack()
            }
        })
    }

    componentDidMount() {
        this.LoginStatus = DeviceEventEmitter.addListener('LoginStatus', (listenerMsg) => {
            this.setState({
               isLogin:true
            }, () => {
                console.log('当前已经登陆')
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
    backgroundColor:'#ededed'
    },
    conter:{
        marginTop:6,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:53
    },
    text:{
        fontSize:14,
        color:'#333'
    },
    nextImg:{
        width:5,
        height:9
    }
});

