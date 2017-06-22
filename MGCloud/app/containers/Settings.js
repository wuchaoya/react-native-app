/**
 * Created by wuchao on 2017/6/21.
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
import ComStyle from '../style/CommonStyle'
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>设置</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

