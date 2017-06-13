/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
   
} from 'react-native';
import MyTabNavigator from '../components/TabNav'
export default class MGCloud extends Component {
    render() {
        return (
            <View style={styles.container}>
            <MyTabNavigator/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
