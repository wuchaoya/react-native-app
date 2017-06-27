/**
 * 游戏类型标签组件
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

export default class GameClass extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={[styles.gameClass,this.props.conterStyle]}>
                <Text style={this.props.style}>{this.props.gameClassText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameClass:{
        borderColor:'#cccccc',
        borderWidth:1,
        paddingBottom:2,
        paddingTop:2,
        paddingLeft:4,
        paddingRight:4,
        borderRadius:4,
    }
});

