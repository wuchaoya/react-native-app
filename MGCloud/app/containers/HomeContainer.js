/**
 * 首页页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
    DeviceEventEmitter,
    BackAndroid,
    ActivityIndicator
} from 'react-native';
import {PullView} from 'react-native-pull';
import ColorStyle from '../style/ColorStyle'
import Banner from '../components/ScrollBanner';
import Title from '../components/Title'
import CommonStyle from '../style/CommonStyle'
import TextConst from '../const/TextConst'
import ScrollGameThemes from '../components/ScrollGameThemes'
import ScrollGameHighlights from '../components/ScrollGameHighlights'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'
import  LoadingContainer from '../containers/LoadingContainer'
import LoadingAnimation from '../components/LoadingAnimation'

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerArray:[],
            dissertation:[],
            gameList:[],
            refreshing: false,
            titleHeight:0
        }
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    onPullRelease(resolve) {
        //do something
        this.getHomeData(resolve)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 44,backgroundColor:'#ededed'}}>
                <LoadingAnimation style={{
                    marginRight:10
                }}/>
                <Text ref={(c) => {this.txtPulling = c;}}>使劲拉</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>松手...</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>刷新中</Text>
            </View>
        );
    }

    render() {
        const {navigate,goBack} = this.props.navigation;
        console.log(this.props.navigation)
        return (
            <View style={{flex:1,}}>
                <HeadNav header="云游戏" onPress={() => {BackAndroid.exitApp()}}/>
                <View style={{height:this.state.titleHeight,backgroundColor:'#ededed',justifyContent:'center',alignItems:'center',flexDirection:'row',overflow:'hidden'}}>
                    <Image style={{width:51,height:13}} source={require('../static/img/emoji.png')}/>
                    <Text>刷新成功</Text>
                </View>
                <PullView style={{width: Dimensions.get('window').width}}
                          onPullRelease={this.onPullRelease}
                          topIndicatorRender={this.topIndicatorRender}
                          topIndicatorHeight={44} >
                    {this.state.gameList.length!==0&&this.state.dissertation.length!==0&&this.state.bannerArray.length!==0?
                        <View style={styles.container}>
                            {this.state.bannerArray.length!==0?<Banner navigation={this.props.navigation} data={this.state.bannerArray}/>:null}
                            <View style={CommonStyle.container}>
                                <Title
                                    titleText={TextConst.HomeContainerText.gameTheme.title}
                                    color="#000"
                                ></Title>
                                <Text
                                    style={styles.subtitle}>{TextConst.HomeContainerText.gameTheme.subtitle}</Text>
                                {this.state.dissertation.length!==0?<ScrollGameThemes data={this.state.dissertation} navigation={this.props.navigation}></ScrollGameThemes>:null}
                            </View>
                            <View style={[{marginTop: 12, paddingTop: 12, backgroundColor: ColorStyle.colorWhite}]}>
                                <View style={styles.homeContainer}>
                                    <Title color="#000" titleText={TextConst.HomeContainerText.gameHighlights.title}></Title>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text onPress={() => navigate('Game')}
                                              style={styles.more}>{TextConst.HomeContainerText.gameHighlights.more}</Text>
                                        <Image style={{width:5,height:9,marginLeft:4}} source={require('../static/img/more.png')}></Image>
                                    </View>
                                </View>
                                {this.state.gameList.length!==0?<ScrollGameHighlights data={this.state.gameList}  navigation={this.props.navigation}></ScrollGameHighlights>:null}
                            </View>
                        </View>:(<  LoadingContainer load="loadHome" isLoading="isLoadHome"/>)}
                </PullView>
            </View>

        );
    }
    getHomeData(resolve){
        HttpRequest.getHomeData('',
            (responseData)=> {

                if(!responseData){
                    DeviceEventEmitter.emit('isLoadHome', false)
                    return
                }
                if(responseData.banner.length==0){
                    responseData.banner.push('')
                }
                if(responseData.dissertation.length==0){
                    let dissertation = [
                        {cover:'',title:'"音乐游戏合集"'},
                        {cover:'',title:"奇葩搞怪像素游戏集合"},
                    ]
                    responseData.dissertation=dissertation
                }
                if(responseData.gameList.length==0){
                   let errArr = [
                       {icon:'',name:'崩坏3'},
                       {icon:'',name:'狙击之王'},
                       {icon:'',name:'海洋连连看'},
                       {icon:'',name:'数字猫'},
                       {icon:'',name:'魔女之权'}]
                    responseData.gameList=errArr
                }
                if(responseData.banner.length===0||responseData.dissertation.length===0||responseData.gameList.length===0){
                    DeviceEventEmitter.emit('isLoadHome', false)
                    return
                }
                this.setState({
                    bannerArray:responseData.banner,
                    dissertation:responseData.dissertation,
                    gameList:responseData.gameList
                },()=>{
                    if(resolve){
                        resolve()
                        this.setState({
                            titleHeight:44,
                        },()=>{
                            setTimeout(()=>{
                                this.setState({
                                    titleHeight:0
                                })
                            },1500)
                        })
                    }
                    console.log(responseData.gameList
                    )
                });

            },
            (error)=> {
                DeviceEventEmitter.emit('isLoadHome', false)
                console.log(error);
            });
    }

    failedLoad(){
        this.loadHome= DeviceEventEmitter.addListener('loadHome',(listenerMsg) => {
            this.getHomeData()
            console.log('要重新加载了')
        });
    }

    componentWillMount() {
        this.failedLoad()
        this.getHomeData()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.colorLightSteelGray,
    },
    subtitle: {
        marginTop: 12,
        color: '#999'
    },
    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginRight: 12,
        paddingLeft: 12,
    },
    more: {
        color: ColorStyle.colorGreen
    }

});
