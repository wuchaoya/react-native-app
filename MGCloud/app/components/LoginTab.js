import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import  SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
let Dimensions = require('Dimensions');
let width = (Dimensions.get('window').width-80)/2;
export default class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'SignIn',
        }
    }

    _renderTab(Component, selectedTab, title) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={{ color:'#83b233',}}
                title={title}
                titleStyle={styles.titleTextColor}
                renderIcon={() => <View style={styles.iconStyle}></View>}//默认图标
                renderSelectedIcon={() => <View style={[styles.iconStyle,{ borderBottomColor:'#83b333'}]}></View>}//选中图标
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component navigation={this.props.navigation}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <TabNavigator
                sceneStyle={{marginTop:43,paddingBottom:0}}
                tabBarStyle={[styles.center,styles.tabBarStyle]}>
                {this._renderTab(SignIn,'SignIn','登录')}
                {this._renderTab(SignUp,'SignUp','注册')}
            </TabNavigator>
        );
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
        width:width,
        position: 'absolute',
        bottom:-37,
        alignSelf:'center',
        height:17,
        borderBottomWidth:2,
        borderBottomColor:'#2d2d2d'
    },
    titleTextColor:{
        fontSize: 14,
        color:'#ddd',
        fontWeight:'800',
        height:31
    },
    tabBarStyle:{
        top:0,
        height: 44,
        backgroundColor:'#2d2d2d',
        paddingLeft:40,
        paddingRight:40,
    }
});
