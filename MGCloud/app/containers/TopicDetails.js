/**
 * 专题详情
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
    StatusBar,
    ListView
} from 'react-native';
import HeadNav from '../components/HeadNav'
import Topic from '../components/Topic'
import HttpRequest from '../common/HttpRequest'
import  LoadingContainer from '../containers/LoadingContainer'
let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class TopicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:this.props.navigation.state.params.name,
            navColor:'#000',
            data:[]
        };
    }
    setNavColor(height){
      this.setState({
          navColor: 'rgba(0,0,0,'+0.01*height+')',
          header:height>42?this.props.navigation.state.params.name:'',

      })
    }
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View>
                <HeadNav
                    header={this.state.header}
                    onPress={() => goBack()}
                    color={this.state.navColor}
                    style={[styles.headNav,{marginLeft:this.state.margin}]}/>
                {this.state.data.length!==0?<ScrollView
                    onScroll={(e)=>this.setNavColor(e.nativeEvent.contentOffset.y)}
                    contentContainerStyle={styles.contentContainer}>
                    <Image
                        style={styles.headImg} resizeMode="cover"
                        source = {{uri:this.state.headImg}}>
                        <View style={styles.headView}>
                            <Text style={[styles.headText,styles.fonSize_15,{marginBottom:18}]}>{this.state.title}</Text>
                            <Text style={[styles.headText,styles.fonSize_11]}>精品大作，够玩一个暑假</Text>
                        </View>
                    </Image>
                    {this.state.data.length===0?null:<Topic data = {this.state.data}  navigation={this.props.navigation}/>}
                </ScrollView>:<  LoadingContainer load="loadHome" isLoading="isLoadHome"/>}
            </View>
            
        );
    }

    componentWillMount() {
        let  {params} = this.props.navigation.state
        HttpRequest.getGameDissertationData(
            {did:params.did},
            (responseData)=>{
                console.log(responseData)
                console.log(typeof responseData)
                this.setState({
                    data:responseData.game,
                    navColor:null,
                    header:'',
                    headImg:responseData.cover,
                    title:responseData.title
                },()=>{
                    console.log('设置成功')
                })
                console.log(this.state.data)
            },
            (error)=>{

            }
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        // paddingVertical: 20,
        backgroundColor:'#ededed'
    },
    headImg:{
        width:width,
        height:200,
        marginBottom:12,
    },
    headView:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.4)',
        flex:1
    },
    headText:{
        color:'#ffffff',
        opacity:1,
    },
    fonSize_15:{
        fontSize:16
    },
    fonSize_11:{
        fontSize:12
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

