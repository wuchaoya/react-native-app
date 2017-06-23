/**
 * 游戏详情的游戏评分
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import { Button} from 'native-base';
import GameClass from '../components/GameClass'
import Star from '../components/Star'
export default class GameGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.flexRow,{justifyContent:'space-around',alignItems: 'center',paddingBottom:15,}]}>
                    <Image style={styles.gameImg} source={require('../static/img/topic1_head.png')}></Image>
                    <View style={{marginTop:9,justifyContent:'space-around',width: 180}}>
                        <Text style={{fontSize:15,color:'#000'}}>爆吧撞死</Text>
                        <Text numberOfLines={1} style={{fontSize:12,color:'#999',marginBottom:4}}>zhe shi shenmo you xizhe shi shenmo you xi </Text>
                        <View style={styles.flexRow}>
                            <GameClass
                                gameClassText="魔幻"
                                style={{ fontSize:12}}
                                conterStyle={{width:36,marginRight:6}}
                            ></GameClass>
                            <GameClass
                                gameClassText="魔幻"
                                style={{ fontSize:12}}
                                conterStyle={{width:36,}}
                            ></GameClass>
                        </View>
                    </View>
                    <View>
                        <Button rounded  style={{height:30,backgroundColor:'#83b233'}}>
                            <Text style={[styles.fonSize_13,{color:'white'}]}>试玩</Text>
                        </Button>
                    </View>
                </View>
                <View style={[styles.flexRow,{justifyContent:'space-between',alignItems: 'center',margin:9,paddingTop:9,borderTopWidth:1,borderTopColor:'#ededed'}]}>
                    <View  style={[styles.flexRow,{alignItems: 'center'}]}>
                        <View style={{marginRight:6}}>
                            <Text>我的</Text>
                            <Text>评分</Text>
                        </View>
                        <Star starNumber={7} textStyle={{fontSize:17}}/>
                    </View>
                    <View>
                        <Image style={{width:35,height:35,justifyContent:'space-around',alignItems: 'center',marginRight:17}} source={require('../static/img/game_grade_icon.png')}>
                            <Text>4.7</Text>
                        </Image>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin:6,
        borderRadius:6,
        backgroundColor:'#fff'
    },
    gameImg:{
        height:65,
        width:65,
        marginTop:9,
        borderWidth:1,
        borderColor:'#e5e5e5',
        borderRadius:10
    },
   flexRow:{
        flexDirection:'row'
    },
    gameGrade:{

    }
});
