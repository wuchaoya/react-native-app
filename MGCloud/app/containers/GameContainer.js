/**
 * 精选游戏列表页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter,
    Modal,
    TouchableOpacity
} from 'react-native';
import HeadNav from '../components/HeadNav'
import GameList from '../components/GameList'
import HttpRequest from '../common/HttpRequest'
import  LoadingContainer from '../containers/LoadingContainer'

export default class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:0,
            data:null,
            isLogin:false,
            enable:false
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
        const { goBack } = this.props.navigation;
        return (
            <View style={{flex:1}} >
                <HeadNav header="游戏列表"  onPress={() => goBack()}  />
                {this.state.data!==null?<GameList name="gameList" data={this.state.data} navigation = {this.props.navigation} />:<  LoadingContainer load="gameList" isLoading="isGameList"/>}
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

    getGameListData(){
        HttpRequest.getGameListData(
            {page:this.state.page},
            (responseData)=>{
                console.log(responseData)
                this.setState({
                  data:responseData
                },()=>{
                    console.log(this.state.data)
                })
            },
            (error)=>{}

        )
    }

    componentDidMount() {
        this.gameListPullRelease= DeviceEventEmitter.addListener('gameListPullRelease',(listenerMsg) => {
            console.log('刷新')
            this.setState({
                page:0
            },()=>{
                HttpRequest.getGameListData(
                    {page:this.state.page},
                    (responseData)=>{
                        DeviceEventEmitter.emit('onLoadGameList', responseData)
                    },
                    (error)=>{}

                )
            })
        });
        this.gameListloadMore= DeviceEventEmitter.addListener('gameListloadMore',(listenerMsg) => {
            let page = this.state.page+1,data=listenerMsg
            this.setState({
                page:page,
            },()=>{
                HttpRequest.getGameListData(
                    {page:this.state.page},
                    (responseData)=>{
                       data=data.concat(responseData)
                        DeviceEventEmitter.emit('gameListloadData', data)
                    },
                    (error)=>{}

                )
            })
        });
        this.gameFeaturedList = DeviceEventEmitter.addListener('gameFeaturedList',(listenerMsg) => {
            this.setState({
                isLogin:listenerMsg,
            },()=>{
                console.log('当前是'+this.state.selectedTab+'页面')
            })
        });

    }

    componentWillMount(){
        this.getGameListData()
    }
}

const styles = StyleSheet.create({});


