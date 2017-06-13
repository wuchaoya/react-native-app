
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home'
import Forum from './Forum'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'Home',
            theme:{
                color:'red'
            },
        }
    }
    _renderTab(Component, selectedTab, title) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme}
                title={title}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
               <View style={styles.container}>
                   <TabNavigator>
                       {this._renderTab(Home,'Home','首页')}
                       {this._renderTab(Forum,'Forum','论坛')}
                       {this._renderTab(Home,'Home','首页')}
                       {this._renderTab(Forum,'Forum','论坛')}
                   </TabNavigator>
               </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

