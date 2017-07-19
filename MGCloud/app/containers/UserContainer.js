/**
 * 我的
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    Modal,
    TouchableOpacity,
    WebView,
    Dimensions
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import UserHead from '../components/UserHead'
import TextConst from '../const/TextConst'
import Title from '../components/Title'
import VipBuy from '../components/VipBuy'
import GiftBag from '../components/GiftBag'
import HttpRequest from '../common/HttpRequest'
const {width, height} = Dimensions.get('window');
export default class user extends Component {

    constructor(props) {
        super(props);
        this.state = {
           showOpen:false,
            isLogin:false,
            isOpen:false,
            data:[],
            url:'http://localhost:8081/debugger-ui',
            openWeb:false
        }
    }

    goLogin(bool){
        this.setState({
            isLogin:false
        },()=>{
            if(bool){
                this.props.navigation.navigate('Login')
            }
        })
    }

    openVip(){
        console.log('点了')
        if(!global.userId){
            this.setState({
                isLogin:true
            })
        }
        else {
            //发送开通请求


            //成功后弹出提示
            this.setState({
                isOpen:true
            })

        }
    }

    render() {
        const { goBack,navigate } = this.props.navigation;
        this.goBack = goBack
        this.navigate=navigate
        return (
            <ScrollView>
                <View style={styles.centering}>
                    <UserHead navigation={this.props.navigation}/>
                    <WebView style={{flex:1}} source={{uri:'https://223.111.8.100:9443/h5pay/api/ygPay?channelCode=41638000&serviceID=760000050880&monthStatus=1&productDescribe=testido&spCode=701095&webId=kztest161010001'}}/>
                    {this.state.data.length==0?null: <View style={styles.container}>
                        <Title
                            titleText={TextConst.VipBuyText.title}
                            color={ColorStyle.colorBlack}
                            fontWeight="400"
                            style={{marginBottom:15}}/>

                        <VipBuy
                            backgroundColor="#FAF0E6"
                            borderColor="#F4A460"
                            buttonColor ='darkorange'
                            recommend={true}
                            name={this.state.data[1].prodect_title}
                            price ={this.state.data[1].prize}
                            time = {' 元/'+this.state.data[1].time_length+'分'}
                            buttonText = {TextConst.VipBuyText.Exclusive.open}
                            onPress={this.openVip.bind(this)}
                        />
                        <VipBuy
                            backgroundColor="#ffffff"
                            borderColor="#cccccc"
                            buttonColor ='#83b233'
                            recommend={false}
                            name={this.state.data[2].prodect_title}
                            price ={this.state.data[2].prize}
                            time = {' 元/'+this.state.data[2].time_length+'分'}
                            buttonText = {TextConst.VipBuyText.Featured.open}
                            onPress={this.openVip.bind(this)}
                        />

                    </View>}
                    {this.state.data.length==0?null: <View style={[styles.container,{marginBottom:23}]}>
                        <Title
                            titleText={TextConst.equityText.title}
                            color={ColorStyle.colorBlack}
                            fontWeight="400"
                            style={{marginBottom:15}}/>
                        <GiftBag
                            color="#ea8e4a"
                            border={true}
                            name={TextConst.equityText.exclusive.name}
                            gameTimeText={TextConst.equityText.exclusive.gameTimeText}
                            intro={this.state.data[0].prodect_describe}
                        />
                        <GiftBag
                            color="#ffba00"
                            border={true}
                            name={TextConst.equityText.chosen.name}
                            gameTimeText={TextConst.equityText.chosen.gameTimeText}
                            intro={this.state.data[1].prodect_describe}
                        />
                        <GiftBag
                            color="#999999"
                            name={TextConst.equityText.tasteOf.name}
                            gameTimeText={TextConst.equityText.tasteOf.gameTimeText}
                            intro={this.state.data[2].prodect_describe}
                        />
                        <Modal
                            transparent={true}
                            animationType={"slide"}
                            visible={this.state.isLogin}
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
                                        <Text>您尚️未登录，是否登录</Text>
                                    </View>
                                    <View style={{
                                        borderTopWidth:1,
                                        height:60,
                                        borderTopColor:'#ddd',
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <TouchableOpacity
                                            onPress={()=>this.goLogin(false)}
                                            style={{width:265/2,height:40,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#ddd'}}>
                                            <Text>取消</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>this.goLogin(true)}
                                            style={{width:265/2,height:40,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{color:'#83b233'}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                        <Modal
                            transparent={true}
                            animationType={"slide"}
                            visible={this.state.isOpen}
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
                                <View style={{justifyContent:'center', alignItems:'center',width:265,height:211}}>
                                    <Image style={{width:61,height:61, position: 'absolute', top:0,zIndex:999}} source={require('../static/img/success.png')}/>
                                    <View style={{width:265,height:150,backgroundColor:'#f2f2f2',borderRadius:6,}}>
                                        <View
                                            style={{
                                                height:93,width:265,
                                                justifyContent:'center',alignItems:'center',
                                                paddingTop:20
                                            }}>
                                            <Text>开通成功</Text>
                                        </View>
                                        <View style={{
                                            borderTopWidth:0.4,
                                            height:53,
                                            borderTopColor:'#ddd',
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({
                                                        isOpen:false
                                                    })
                                                }}
                                                style={{width:265/2,height:53,justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{color:'#83b233'}}>确定</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </Modal>
                    </View>}
                </View>
            </ScrollView>
        );
    }
    showOpen(){

    }

    open(){
        HttpRequest.ygPay({
                uId:"1100823869",
                channelCode:'41638000',
                serviceID:"500230544000",
                monthStatus:'1',
                productDescribe:'testido',
                spCode:'698042',
                etel:'13939448850',
                theme:'',
                cloudgame:1,
                signature:'',

            },
            (response)=>{
                console.log(response)
                console.log(response.yg_url)
               //this.navigate('Pact',{url:this.state.url,title:'开通包月'})
            },
            (error)=>{

            }
        )
    }

    getService(){
        HttpRequest.serviceList('',
            (response)=>{
                console.log(response)
                this.setState({
                    data:response
                })
            },
            (error)=>{

            }
        )
    }
    componentWillMount(){
         this.open()
         this.getService()
    }
}

const styles = StyleSheet.create({
    centering: {
        flex:1,
        backgroundColor:"darkgray",
        flexDirection:'column',
        backgroundColor:'#fff',

    },
    container:{
        marginTop:26,
        paddingLeft:12,
        paddingRight:12
    },
});

