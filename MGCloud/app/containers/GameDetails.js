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

export default class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TransparentStatusBar opacity={0.3}/>
                    <GameDetailsVideo/>
                    <GameGrade/>
                    <GameChart/>
                    <GameDescription/>
                    <GameOtherInfo/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ededed'
    },
    
});

