import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import TabNav from '../components/TabNav'

export default class BaseApp extends Component {
    render() {
        return (
            <View style={styles.container}>
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
