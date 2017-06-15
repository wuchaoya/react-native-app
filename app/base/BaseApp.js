import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import TabNav from '../components/TabNav'

export default class BaseApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent={true}
                    barStyle="light-content"
                />
                <TabNav/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
