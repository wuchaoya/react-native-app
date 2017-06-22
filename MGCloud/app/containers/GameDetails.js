
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';

export default class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>游戏详情</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

