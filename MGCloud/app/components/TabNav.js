import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeContainer from '../containers/HomeContainer'
import RankingContainer from '../containers/RankingContainer'
import UserContainer from '../containers/UserContainer'
import ForumContainer from '../containers/ForumContainer'

export default class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            theme: {
                color: 'red'
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
            <TabNavigator>
                {this._renderTab(HomeContainer, 'Home', '首页')}
                {this._renderTab(RankingContainer, 'Ranking', '排行')}
                {this._renderTab(ForumContainer, 'Forum', '论坛')}
                {this._renderTab(UserContainer, 'User', '我的')}
            </TabNavigator>
        );
    }
}


