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
import LoginTab  from '../components/LoginTab'
import HeadNav from '../components/HeadNav'
import LoginInput from '../components/LoginInput'
export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <HeadNav color="#2d2d2d"/>
                <LoginTab/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

