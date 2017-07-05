import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../static/img/loading.gif')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
});