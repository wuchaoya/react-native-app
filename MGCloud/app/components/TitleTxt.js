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

export default class TitleTxt extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Text style={[styles.font_title]}></Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    font_title:{
    }
});

