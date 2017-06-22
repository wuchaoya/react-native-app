
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class GameDetailsVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View>
                <Image resizeMode="cover" style={styles.container} source={require('../static/img/game_vidoe.png')}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:200,
        width:width
    },

});

