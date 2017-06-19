/**
 * Created by Administrator on 2017/3/31 0031.
 */
import React from 'react';
import {
    AppRegistry,
    Text,View,Button,
    StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import CommonStyle from './style/CommonStyle'
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',//设置标题内容
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent={true}
                    barStyle="light-content"
                    hidden={false}
                />
                <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat',{user:'Lucy'})}
                    title="Chat with Lucy"/>
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title:'',//设置标题
            // header:null,//设置一些导航的属性,null为隐藏
            headerTitle:'详情',//设置导航栏标题
            headerBackTitle:null,//设置跳转页面左侧返回箭头后面的文字
            headerTruncatedBackTitle:'返回',
            headerRight:null,
            headerLeft:null,
            headerStyle:CommonStyle.headerStyle,
            headerTitleStyle:CommonStyle.headerTitleStyle
        }
    },
    Chat:{screen:ChatScreen},



},);

export default SimpleApp;