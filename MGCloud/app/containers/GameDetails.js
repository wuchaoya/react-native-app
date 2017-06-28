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
    ScrollView
} from 'react-native';
import GameDetailsVideo from '../components/GameDetailsVideo'
import TransparentStatusBar from '../components/TransparentStatusBar'
import GameGrade from '../components/GameGrade'
import GameChart from '../components/GameChart'
import GameDescription from '../components/GameDescription'
import GameOtherInfo from  '../components/GameOtherInfo'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:'',
            navColor:null,
            height:0,
        }
    }
    setNavColor(height){
        this.setState({
            navColor: height>42?'#000':null,
            header:height>42?'游戏详情':'',
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
                    style={[styles.headNav]}/>
                <ScrollView
                    onScroll={(e)=>this.setNavColor(e.nativeEvent.contentOffset.y)}
                >
                    <View style={styles.container}>
                        <GameDetailsVideo/>
                        <GameGrade/>
                        <GameChart/>
                        <GameDescription/>
                        <GameOtherInfo/>
                    </View>
                </ScrollView>
            </View>
        );
    }
    componentWillMount() {
        HttpRequest.getGameDetailData({gid:1000,user_id:487},
            (responseData)=> {
                console.log(responseData)
            },
            (error)=> {
                console.log(error);
            });
    }
}

const styles = StyleSheet.create({
    container: {
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

