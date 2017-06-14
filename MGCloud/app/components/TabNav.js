import React, {Component} from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeContainer from '../containers/HomeContainer'
import RankingContainer from '../containers/RankingContainer'
import UserContainer from '../containers/UserContainer'
import ForumContainer from '../containers/ForumContainer'
import ComStyle from '../style/CommonStyle'
const icon = {
    i_home: require('../static/img/i-首页.png'),
    i_home_select: require('../static/img/i-首页_selected.png'),
    i_ranKing: require('../static/img/i-排行.png'),
    i_ranKing_select: require('../static/img/i-排行_selected.png'),
    i_forum: require('../static/img/i-论坛.png'),
    i_forum_select: require('../static/img/i-论坛_selected.png'),
    i_user: require('../static/img/i-我的.png'),
    i_user_select: require('../static/img/i-我的_selected.png'),
}

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

    _renderTab(Component, selectedTab, title, iconImg, selectedIconImg) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme}
                title={title}
                renderIcon={() => <Image style={styles.img} source={iconImg }/>}//默认图标
                renderSelectedIcon={() => <Image style={styles.img} source={selectedIconImg}/>}//选中图标
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <TabNavigator tabBarStyle={ComStyle.center}>
                {this._renderTab(HomeContainer, 'Home', '首页', icon.i_home, icon.i_home_select)}
                {this._renderTab(RankingContainer, 'Ranking', '排行', icon.i_ranKing, icon.i_ranKing_select)}
                {this._renderTab(ForumContainer, 'Forum', '论坛', icon.i_forum, icon.i_forum_select)}
                {this._renderTab(UserContainer, 'User', '我的', icon.i_user, icon.i_user_select)}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 21,
        height: 18,
    },
});
