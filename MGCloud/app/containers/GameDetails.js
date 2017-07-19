/**
 * 游戏详情页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    ScrollView,
    Modal,
    TouchableOpacity,
} from 'react-native';
import GameDetailsVideo from '../components/GameDetailsVideo'
import TransparentStatusBar from '../components/TransparentStatusBar'
import GameGrade from '../components/GameGrade'
import GameChart from '../components/GameChart'
import GameDescription from '../components/GameDescription'
import GameOtherInfo from  '../components/GameOtherInfo'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'
import GameGallery from '../components/GameGallery'
import  LoadingContainer from '../containers/LoadingContainer'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
let starNumber=0

export default class GameDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header:'游戏详情',
            navColor:'#000',
            height:0,
            data:[],
            isShow:false,
            userId:null,
            subStar:false,
            statusBarOpacity:0,
            isLogin:false,
            starDisable:false,
            isStar:false,
            starNumber:0

        }
    }

    setNavColor(height){
        this.setState({
            navColor: 'rgba(0,0,0,'+0.01*height+')',
            header:height>42?'游戏详情':'',
        })
    }

    heiden(){
        this.setState({
            isShow:false,
            statusBarOpacity:0
        })
    }

    getDetailsData(){
        let  {params} = this.props.navigation.state
        HttpRequest.getGameDetailData({gid:params.gid,user_id:global.userId?global.userId:null},
            (responseData)=> {
                if(responseData.images.length!==0){
                    let  arr = []
                    responseData.images.forEach((url)=>{
                       if( (/\.jpg$|\.jpeg$|\.gif$|\.png$/i).test(url)){
                           arr.push(url)
                       }
                    })
                    responseData.images = arr
                }
                this.setState(
                    {
                        data:responseData,
                        starNumber:responseData.my_score,
                        isStar:responseData.my_score!=0?true:false,
                        header:'',
                        navColor:null
                    },()=>{
                        console.log(this.state.isStar)
                    }
                )
            },
            (error)=> {
                console.log(error);
            });
    }

    hidenSubStar(bool){
        this.setState({
            subStar:false,
            statusBarOpacity:0,
            starNumber:bool?starNumber:this.state.starNumber
        },()=>{
            console.log(this.state.subStar)
            if(bool===true){
                const  {params} = this.props.navigation.state
                HttpRequest.score({
                        score:starNumber,
                        user_id:global.userId,
                        gid:params.gid
                    },
                    (response)=>{
                        console.log(response)
                        this.getDetailsData()
                    },
                    (error)=>{

                    }
                )
            }
        })
    }

    goLogin(bool){
        this.setState({
            isLogin:false
        },()=>{
            if(bool){
                const  {params} = this.props.navigation.state
                this.props.navigation.navigate('Login',params)
            }
        })
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View>
                <TransparentStatusBar opacity={this.state.statusBarOpacity}/>
                <HeadNav
                    header={this.state.header}
                    onPress={() => goBack()}
                    color={this.state.navColor}
                    style={[styles.headNav]}/>
                {this.state.data.length==0?
                    <LoadingContainer load='GameDetail' isLoading={"isGameDetail"}/>:
                    <ScrollView
                    onScroll={(e)=>this.setNavColor(e.nativeEvent.contentOffset.y)}
                >
                    {this.state.data.length!==0?<View style={styles.container}>
                        <GameDetailsVideo data={this.state.data}/>
                        <GameGrade starNumber={this.state.starNumber} isStar={this.state.isStar} starDisable={this.state.starDisable} navigation={this.props.navigation} data={this.state.data}/>
                        <GameChart data={this.state.data} isShow={this.state.isShow}/>
                        <GameDescription data={this.state.data}/>
                        <GameOtherInfo data={this.state.data}/>
                        <Modal
                            style={{flex:1,opacity:0}}
                            animationType={"slide"}
                            transparent={true}
                            visible={this.state.isShow}
                            onRequestClose={()=>{
                                console.log('点了返回键')
                              this.setState({
                                  isShow:false
                              })
                            }
                            }

                        ><GameGallery images={this.state.data.images} onPress={
                            this.heiden.bind(this)
                        }/>

                        </Modal>
                        <Modal
                        transparent={true}
                        animationType={"slide"}
                        visible={this.state.subStar}
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
                                    <Text>是否确认评分</Text>
                                </View>
                                <View style={{
                                    borderTopWidth:1,
                                    height:60,
                                    borderTopColor:'#ddd',
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={()=>this.hidenSubStar(false)}
                                        style={{width:265/2,height:40,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#ddd'}}>
                                        <Text>取消</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>this.hidenSubStar(true)}
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
                    </View>:null}
                </ScrollView>
                }
            </View>
        );
    }

    componentWillMount() {
        this.gallery = DeviceEventEmitter.addListener('Gallery',(listenerMsg) => {
            this.setState({
                isShow:listenerMsg,
                statusBarOpacity:0.7
            },()=>{
                console.log('该显示全屏图片了',this.state.isShow)
            })
        });
        this.subStar = DeviceEventEmitter.addListener('subStar',(listenerMsg) => {
            this.setState({
                subStar:true,
                statusBarOpacity:0.7
            },()=>{
               starNumber = listenerMsg
            })
        });
        this.gameGradeLogin = DeviceEventEmitter.addListener('gameGradeLogin',(listenerMsg) => {
            this.setState({
                isLogin:listenerMsg,
                statusBarOpacity:0.7
            },()=>{
                console.log('提交评分',this.state.isStar)
            })
        });
        this.LoginStatus = DeviceEventEmitter.addListener('LoginStatus',(listenerMsg) => {
            this.getDetailsData()
        });
        this.getDetailsData()

    }

    componentWillUnmount(){
        this.gallery.remove()
        this.subStar.remove()
        this.gameGradeLogin.remove()
        this.LoginStatus.remove()
        Dimensions=null;
        width=null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ededed'
    },
    headNav:{
        position: 'absolute',
        top:0,
        flexDirection: 'row',
        height:64,
        justifyContent:'space-between',
        alignItems: 'center',
        width:width,
        zIndex:2
    }
});

