
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    BackHandler
} from 'react-native';
import {PullView} from 'react-native-pull';
import ScrollableTabView ,{DefaultTabBar} from 'react-native-scrollable-tab-view'
import TabBartest from '../components/test'
import TransparentStatusBar from '../components/TransparentStatusBar'
import HeadNav from '../components/HeadNav'
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['热玩榜', '新品榜', '预约榜',],
        };
    }


    render() {
        return(
            <View style={styles.container}>
                <TransparentStatusBar/>
                <HeadNav header="排行榜" onPress={() => {BackHandler.exitApp()}}/>
                <ScrollableTabView
                    style={{height:96/2 }}
                    tabBarUnderlineStyle={{backgroundColor:'#83b233',height:1,width:90,
                    }}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#83b233'
                    tabBarInactiveTextColor="#888"
                    tabBarTextStyle={{fontSize:14}}
                    renderTabBar={() => <DefaultTabBar style={{paddingLeft:30,paddingRight:30}} underlineStyle={{paddingLeft:30}}  tabStyle={{width:90,}}  />
                    }
                >
                    <Text tabLabel='热玩榜'>My</Text>
                    <Text tabLabel='新品榜'>favorite</Text>
                    <Text tabLabel='预约榜'>project</Text>
                </ScrollableTabView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        flex: 1
    },

});