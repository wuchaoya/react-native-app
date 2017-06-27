/**
 * 精选游戏列表页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import HeadNav from '../components/HeadNav'
import GameList from '../components/GameList'

const gameListDataHotPlay = [
    {
        gameImg: require('../static/img/user_head_icon.jpg'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:false
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    }
]

export default class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View >
                <HeadNav header="游戏列表"  onPress={() => goBack()}  />
                <GameList data={gameListDataHotPlay} navigation = {this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({});


