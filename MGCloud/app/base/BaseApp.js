import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import TabNav from '../components/TabNav'
import { StackNavigator } from 'react-navigation';
import CommonStyle from '../style/CommonStyle'
import UserHead from '../components/UserHead';
import TopicDetails from '../containers/TopicDetails'
class BaseApp extends Component {
    static navigationOptions = {
        title: 'Welcome',//设置标题内容
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent={true}
                    barStyle="light-content"
                    hidden={false}
                />
                <TabNav navigation={this.props.navigation}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const SimpleApp = StackNavigator({
    Home: {
        screen: BaseApp,
        navigationOptions:{
            title:'',//设置标题
            header:null,//设置一些导航的属性,null为隐藏
            headerTitle:'详情',//设置导航栏标题
            headerBackTitle:null,//设置跳转页面左侧返回箭头后面的文字
            headerTruncatedBackTitle:'返回',
            headerRight:null,
            headerLeft:null,
            headerStyle:CommonStyle.headerStyle,
            headerTitleStyle:CommonStyle.headerTitleStyle
        }
    },
    UserHead:{screen:UserHead},
    TopicDetails:{screen:TopicDetails},


},);

export default SimpleApp;