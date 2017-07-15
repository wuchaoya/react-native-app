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
            isStar:false,
            isShow:false
        }
    }
    onStarRatingPress(rating) {
        console.log(this.props.isStar+'我看看有没有评过分')
        if(!global.userId){

            DeviceEventEmitter.emit('gameGradeLogin',true)

            return
        }
        if(this.props.isStar){
            console.log('评过了')
        }
        if(!this.props.isStar){
            DeviceEventEmitter.emit('subStar', rating)
        }
        this.setState({
            starCount: this.props.isStar?this.state.starCount:rating,
            isShow:this.props.isStar?true:false
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
                            {this.state.data.label.slice(0,2).map((item,i)=>{
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
                                    if(!global.userId){
                                        DeviceEventEmitter.emit('gameGradeLogin', true)
                                        return
                                    }
                                    const  {params} = this.props.navigation.state
                                    RNInteraction.startCloudPlay({gid:params.gid})
                                }
                            }
                            rounded  style={{height:30,backgroundColor:'#83b233'}}>
                            <Text style={[styles.fonSize_13,{color:'white'}]}>云玩</Text>
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
                            rating={this.props.starNumber}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starColor="#ff8800"
                            emptyStarColor="rgb(221,221,221)"
                            starSize={17}
                            starStyle={{marginLeft:6}}
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

