import React, {Component} from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ComStyle from '../style/CommonStyle'
import ColorStyle from '../style/ColorStyle'
import GameList from '../components/GameList'
export default class TabNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'HotPlay',
            theme: {
                color:ColorStyle.colorGreen,
            },
            efaultIcon:{
                home: require('../static/img/home_icon.png'),
                ranKing: require('../static/img/ranking_icon.png'),
                forum: require('../static/img/forum_icon.png'),
                user: require('../static/img/user_icon.png'),
            },
            selectIcon:{
                home: require('../static/img/home_selected_icon.png'),
                ranKing: require('../static/img/ranking_icon_selected.png'),
                forum: require('../static/img/forum_icon_selected.png'),
                user: require('../static/img/user_icon_selected.png'),
            }
        }
    }

    _renderTab(Component, selectedTab, title) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme}
                title={title}
                titleStyle={styles.titleTextColor}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component name={title}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <TabNavigator
                sceneStyle={{marginTop:60}}
                tabBarStyle={[ComStyle.center,{position: 'absolute',
        top:0,height: 50}]}>
                {this._renderTab(GameList,'HotPlay','热玩榜')}
                {this._renderTab(GameList,'NewProducts','新品榜')}
                {this._renderTab(GameList,'Reserve','预约榜')}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    flex: {

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconStyle: {
        width: 21,
        height: 18,
    },
    titleTextColor:{
        color:ColorStyle.colorSlategray
    }
});
