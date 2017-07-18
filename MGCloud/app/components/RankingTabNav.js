/**
 * 排行榜的tab组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    DeviceEventEmitter,
    Text
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ColorStyle from '../style/ColorStyle'
import GameList from '../components/GameList'
import  LoadingContainer from '../containers/LoadingContainer'
import Display from 'react-native-display';

export default class RankingTabNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'hotPlay',
            theme: {
                color:ColorStyle.colorGreen,
            },
            lineIcon : require('../static/img/line_icon.png'),
            lineGreenIcon : require('../static/img/line_green_icon.png'),
            hotPlay:this.props.data.hotPlay,
            newProducts:this.props.data.newProducts,
            reserve:this.props.data.reserve,
            Display:false
        }
    }

    _renderTab(Component, selectedTab, title, iconImg,selectedIconImg,data) {
        console.log('看看')
        console.log(this.props.data.hotPlay)

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={{ color:'#83b233',}}
                title={title}
                titleStyle={styles.titleTextColor}
                renderIcon={() => <View style={styles.iconStyle}></View>}//默认图标
                renderSelectedIcon={() => <View style={[styles.iconStyle,{ borderBottomColor:'#83b333'}]}></View>}//选中图标
                onPress={() => this.setState({selectedTab: selectedTab},()=>{
                    DeviceEventEmitter.emit('selectedTab', this.state.selectedTab)
                })}>

                {this.props.data[selectedTab]?<Component
                    showNumber={true}
                    name={title}
                    data={this.props.data[selectedTab]}
                    navigation ={this.props.navigation}/>:<LoadingContainer load={selectedTab} isLoading={"is"+selectedTab}/>}
            </TabNavigator.Item>
        )
    }

    render() {

            return (
            <TabNavigator
                sceneStyle={{marginTop:48,paddingBottom:0}}
                tabBarStyle={[styles.center,styles.tabBarStyle]}>
                {this._renderTab(GameList,'hotPlay','热玩榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.hotPlay)}
                {this._renderTab(GameList,'newProducts','新品榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.newProducts)}
                {this._renderTab(GameList,'reserve','预约榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.reserve)}
            </TabNavigator>
        )
    }


}


const styles = StyleSheet.create({
    flex: {

    },
    center: {
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    iconStyle: {
        width:90,
        position: 'absolute',
        bottom:-37,
        alignSelf:'center',
        height:17,
        borderBottomWidth:2,
        borderBottomColor:'#fff'
    },
    titleTextColor:{
        fontSize: 14,
        color:'#999',
        height:31
    },
    tabBarStyle:{
        position: 'absolute',
        top:0,
        height: 48,
        paddingLeft: 40,
        paddingRight: 40,
        margin:0,
        padding:0,
        backgroundColor:'#fff'
    }
});
