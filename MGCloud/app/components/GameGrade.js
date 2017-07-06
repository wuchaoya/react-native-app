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
    DeviceEventEmitter,
    Modal
} from 'react-native';
import { Button} from 'native-base';
import GameClass from '../components/GameClass'
import StarRating from 'react-native-star-rating';
import RNInteraction from '../common/RNInteraction'
import Display from 'react-native-display';
export default class GameGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            starCount:this.props.data.my_score,
            isShow:false,
            isStar:false
        }
    }
    onStarRatingPress(rating) {
        if(!this.state.isStar){
            DeviceEventEmitter.emit('subStar', true)
        }
        this.setState({
            starCount: this.state.isStar?this.state.starCount:rating,
            isStar:true,
            isShow:this.state.isStar?true:false
        },()=>{
            setTimeout(()=>{
                this.setState({
                   isShow:false
                })
            },2000)
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.flexRow,{justifyContent:'space-around',alignItems: 'center',paddingBottom:15,}]}>
                    <Image style={styles.gameImg} source={{uri:this.state.data.icon}}></Image>
                    <View style={{marginTop:9,justifyContent:'space-around',width: 180}}>
                        <Text style={{fontSize:15,color:'#000'}}>{this.state.data.name}</Text>
                        <Text numberOfLines={1} style={{fontSize:12,color:'#999',marginBottom:4}}>{this.state.data.introduction}</Text>
                        <View style={[styles.flexRow,{height:25,flexWrap:'wrap'}]}>
                            {this.state.data.type.slice(0,2).map((item,i)=>{
                                return (
                                    <GameClass
                                        key = {i}
                                        gameClassText={item}
                                        style={{ fontSize:12}}
                                        conterStyle={{marginRight:6}}
                                    ></GameClass>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Button
                            onPress={
                                () => {
                                    //RNInteraction.startCloudPlay()
                                }
                            }
                            rounded  style={{height:30,backgroundColor:'#83b233'}}>
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
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starColor="#ff8800"
                            emptyStarColor="gray"
                            starSize={17}
                        />
                        <Display
                            style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                            enable={this.state.isShow}
                            enter="flipInX"
                            exit="flipOutX"
                        >
                            <Image style={{width:7,height:12}} source={require('../static/img/tipsLeft.png')}/>
                            <View style={styles.tipos}>
                                <Text style={{color:'#ddd',fontSize:12}}>已评分</Text>
                            </View>
                        </Display>

                    </View>
                    <View>
                        <Image style={{width:35,height:35,justifyContent:'space-around',alignItems: 'center',marginRight:17}} source={require('../static/img/game_grade_icon.png')}>
                            <Text>{parseInt(this.state.data.score)==this.state.data.score?this.state.data.score:this.state.data.score.toFixed(1)}</Text>
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

    },
    tipos:{
        flexDirection:'row',
        width:60,
        height:35,
        backgroundColor:'rgba(51,51,51,1)',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    }
});

