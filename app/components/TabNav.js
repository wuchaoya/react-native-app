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
import TextConst from '../const/TextConst'
import ColorStyle from '../style/ColorStyle'

export default class TabNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Ranking',
            theme: {
                color:ColorStyle.colorGreen
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

    _renderTab(Component, selectedTab, title, iconImg, selectedIconImg) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme}
                title={title}
                titleStyle={styles.titleTextColor}
                renderIcon={() => <Image style={styles.iconStyle} source={iconImg }/>}//默认图标
                renderSelectedIcon={() => <Image style={styles.iconStyle} source={selectedIconImg}/>}//选中图标
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <TabNavigator tabBarStyle={ComStyle.center}>
                {this._renderTab(HomeContainer, 'Home',TextConst.TabNavText.Home,this.state.efaultIcon.home,this.state.selectIcon.home)}
                {this._renderTab(RankingContainer, 'Ranking',TextConst.TabNavText.Ranking, this.state.efaultIcon.ranKing,this.state.selectIcon.ranKing)}
                {this._renderTab(ForumContainer, 'Forum',TextConst.TabNavText.Forum, this.state.efaultIcon.forum,this.state.selectIcon.forum)}
                {this._renderTab(UserContainer, 'User', TextConst.TabNavText.User,this.state.efaultIcon.user,this.state.selectIcon.user)}
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
    iconStyle: {
        width: 21,
        height: 18,
    },
    titleTextColor:{
        color:ColorStyle.colorSlategray
    }
});
