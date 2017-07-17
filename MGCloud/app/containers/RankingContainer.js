/**
 * 排行页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    BackHandler,
    TouchableOpacity,
    Modal
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import RankingTabNav from '../components/RankingTabNav'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'
import Filter from '../common/Filter'

export default class RankingContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starNumber: 1,
            selectedTab:'hotPlay',
            hotPlay:null,
            newProducts:null,
            reserve:null,
            PullRelease:false,
            hotPlayPage:0,
            newProductsPage:0,
            reservePage:0,
            isLogin:false
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

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeadNav header="排行榜" onPress={() => {BackHandler.exitApp()}}/>
                <RankingTabNav data={this.state} navigation={this.props.navigation}/>
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
                                <Text>您尚️未登陆，是否登陆</Text>
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
            </View>
        );
    }

    getHotPlayList(){
        HttpRequest.getRankListData({
                page:this.state.hotPlayPage,
                type:1
            },
            (responseData)=> {
                this.setState({
                    hotPlay:Filter.dirtyData(responseData)
                },()=>{
                    DeviceEventEmitter.emit('onLoadHotPlay', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

    getNewProducts(){
        HttpRequest.getRankListData({
                page:this.state.newProductsPage,
                type:2
            },
            (responseData)=> {
                this.setState({
                    newProducts:Filter.dirtyData(responseData)
                },()=>{
                    DeviceEventEmitter.emit('onLoadNewProducts', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }
    //"83215266088121"
    getReserve(){
        HttpRequest.getRankListData({
                user_id:global.userId?global.userId:null,
                page:0,
                type:3
            },
            (responseData)=> {
            console.log('预约的数据')
            console.log(responseData)
                this.setState({
                    reserve:Filter.dirtyData(responseData)
                },()=>{
                    console.log(this.state.reserve)
                    DeviceEventEmitter.emit('onLoadReserve', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

    componentDidMount() {
        //监听是那个选项
        this.msgListener = DeviceEventEmitter.addListener('selectedTab',(listenerMsg) => {
            this.setState({
                selectedTab:listenerMsg,
            },()=>{
                console.log('当前是'+this.state.selectedTab+'页面')
            })
        });
        //监听刷新事件
        this.isPullRelease = DeviceEventEmitter.addListener('PullRelease',(listenerMsg) => {
            this.setState({
                PullRelease:listenerMsg,
            },()=>{
                console.log(this.state.selectedTab+'++++++++++++++++++')
                if(this.state.selectedTab=='hotPlay'){
                    this.setState({
                        hotPlayPage:0
                    },()=>{
                        HttpRequest.getRankListData({
                                page:this.state.hotPlayPage,
                                type:1
                            },
                            (responseData)=> {
                                    if(responseData.length!==0){
                                        DeviceEventEmitter.emit('onLoadHotPlay', responseData)
                                    }
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })
                }
                if(this.state.selectedTab=='newProducts'){
                    console.log('新品刷新')
                    this.setState({
                        newProductsPage:0
                    },()=>{
                        HttpRequest.getRankListData({
                                page:this.state.newProductsPage,
                                type:2
                            },
                            (responseData)=> {
                                if(responseData.length!==0){
                                    DeviceEventEmitter.emit('onLoadNewProducts', responseData)
                                }
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })
                }
                if(this.state.selectedTab=='reserve'){
                    console.log('预约刷新')
                    this.setState({
                        reservePage:0
                    },()=>{
                        HttpRequest.getRankListData({
                                user_id:1,
                                page:this.state.reservePage,
                                type:3
                            },
                            (responseData)=> {
                                if(responseData.length!==0){
                                    DeviceEventEmitter.emit('onLoadReserve', responseData)
                                }
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })
                }
            })
        });
        //监听加载事件
        this.loadMore = DeviceEventEmitter.addListener('loadMore',(listenerMsg) => {
            //加载时候发送过来加载前的数据，这边拿到数据发请求合并数组再发过去
                if(this.state.selectedTab=='hotPlay'){
                    let page= this.state.hotPlayPage
                    console.log('热玩加载')
                    this.setState({
                        hotPlay:listenerMsg,
                        hotPlayPage:page+1
                    },()=>{
                        HttpRequest.getRankListData({
                                page:this.state.hotPlayPage,
                                type:1
                            },
                            (responseData)=> {
                            //没有数据的时候
                            if(responseData.length===0){
                                DeviceEventEmitter.emit('hotPlayloadComplete', false)
                                return
                            }
                                let  data = this.state.hotPlay
                                data = data.concat(responseData)
                                console.log(data)
                                DeviceEventEmitter.emit('hotPlayloadComplete', data)
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })

                }
                if(this.state.selectedTab=='newProducts'){
                    let page= this.state.newProductsPage
                    console.log('热玩加载')
                    this.setState({
                        newProducts:listenerMsg,
                        newProductsPage:page+1
                    },()=>{
                        HttpRequest.getRankListData({
                                page:this.state.newProductsPage,
                                type:2
                            },
                            (responseData)=> {
                                //没有数据的时候
                                if(responseData.length===0){
                                    DeviceEventEmitter.emit('newProductsloadComplete', false)
                                    return
                                }
                                let  data = this.state.newProducts
                                data = data.concat(responseData)
                                console.log(data)
                                DeviceEventEmitter.emit('newProductsloadComplete', data)
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })
                }
                if(this.state.selectedTab=='reserve'){
                    console.log('预约加载')
                    let page= this.state.reservePage
                    this.setState({
                        reserve:listenerMsg,
                        reservePage:page+1
                    },()=>{
                        HttpRequest.getRankListData({
                                user_id:1,
                                page:this.state.reservePage,
                                type:3
                            },
                            (responseData)=> {
                                //没有数据的时候
                                if(responseData.length===0){
                                    DeviceEventEmitter.emit('reserveloadComplete', false)
                                    return
                                }
                                let  data = this.state.reserve
                                data = data.concat(responseData)
                                console.log(data)
                                DeviceEventEmitter.emit('reserveloadComplete', data)
                            },
                            (error)=> {
                                console.log(error);
                            });
                    })
                }
        });
        //监听登陆事件
        this.gameRankingList = DeviceEventEmitter.addListener('gameRankingList',(listenerMsg) => {
            this.setState({
                isLogin:listenerMsg,
            },()=>{
                console.log('当前是'+this.state.selectedTab+'页面')
            })
        });

        //监听登陆状态
        this.LoginStatus = DeviceEventEmitter.addListener('LoginStatus',(listenerMsg) => {
           console.log('登陆后刷新预约榜的数据')
            this.setState({
                reservePage:0
            },()=>{
                HttpRequest.getRankListData({
                        user_id:global.userId?global.userId:null,
                        page:this.state.reservePage,
                        type:3
                    },
                    (responseData)=> {
                        if(responseData.length!==0){
                            DeviceEventEmitter.emit('onLoadReserve', responseData)
                        }
                    },
                    (error)=> {
                        console.log(error);
                    });
            })
        });

    }

    componentWillMount() {

        this.getHotPlayList()
        this.getNewProducts()
        this.getReserve()

    }

    componentWillUnmount(){
        //清除监听
        console.log('清除监听')
        this.msgListener.remove()
        this.isPullRelease.remove()
        this.loadMore.remove()
        this.gameRankingList.remove()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    head: {
        height:60,
        backgroundColor:ColorStyle.colorGreen,
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:ColorStyle.colorWhite,
        fontFamily:'Arial',
    }
});

