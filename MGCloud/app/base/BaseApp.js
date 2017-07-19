import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Button,
    NativeModules,
    Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import TabNav from '../components/TabNav'
import TopicDetails from '../containers/TopicDetails'
import Settings from '../containers/Settings'
import RankingContainer from '../containers/RankingContainer'
import GameDetails from '../containers/GameDetails'
import TransparentStatusBar from '../components/TransparentStatusBar'
import HeadNav from '../components/HeadNav'
import Login from '../containers/LoginContainer'
import SMSLanding from  '../containers/SMSLandingContainer'
import RestPass from '../containers/RestPassContainer'
import Game from '../containers/GameContainer'
import Pact from '../containers/PactContainer'
import HttpRequest from '../common/HttpRequest'
import Configs from '../const/Configs'
class BaseApp extends Component {
    static navigationOptions = {
        title: 'Welcome',//设置标题内容
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TransparentStatusBar/>
                <TabNav navigation={this.props.navigation}/>
            </View>
        );
    }

    componentDidMount() {
        this.versionCheck();
    }

    /**
     * 版本检查
     */
    versionCheck() {
        // TODO by L.jinzhu for 待服务器提供更新接口后修改
        HttpRequest.versionCheck('',
            (newVersion)=> {
                if (Platform.OS != 'android') {
                    return;
                }
                if (newVersion != Configs.appData.versionCode) {
                    Alert.alert(
                        '发现新版本,是否升级?',
                        '版本号: ${version.versionName}\n版本描述: ${version.description}',
                        [
                            {
                                text: '是',
                                onPress: () => {
                                    this.setState({
                                        currProgress: Math.random() * 80,
                                        modalVisible: true
                                    });

                                    NativeModules.UpdateAndroid.doUpdate('', (progress)=> {
                                        let pro = Number.parseFloat('' + progress);
                                        if (pro >= 100) {
                                            this.setState({
                                                modalVisible: false,
                                                currProgress: 100
                                            });
                                        } else {
                                            this.setState({
                                                currProgress: pro
                                            });
                                        }
                                    });
                                }
                            },
                            {
                                text: '否'
                            }
                        ]
                    )
                } else {
                    Alert.alert(
                        '已经升级成最新版本',
                        '我暂时只用于测试版本升级,不能用于测试其他功能'
                    )
                }
            },
            (error)=> {
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const SimpleApp = StackNavigator(
    {
        Home: {
            screen: BaseApp,
            navigationOptions: {
                title: '',//设置标题
                header: null,//设置一些导航的属性,null为隐藏
                headerTitle: '详情',//设置导航栏标题
                headerBackTitle: null,//设置跳转页面左侧返回箭头后面的文字
                headerTruncatedBackTitle: '返回',
                // headerRight:null,
                // headerLeft:null,
                // headerStyle:CommonStyle.headerStyle,
                // headerTitleStyle:CommonStyle.headerTitleStyle
            }
        },
        RankingContainer: {screen: RankingContainer},
        TopicDetails: {
            screen: TopicDetails,
            navigationOptions: {
                title: '',//设置标题
                headerTitle: '详情',//设置导航栏标题
                headerBackTitle: null,//设置跳转页面左侧返回箭头后面的文字
                header: null,
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                header: null,
            }
        },
        GameDetails: {
            screen: GameDetails,
            navigationOptions: {
                header: null,
            }

        },
        HeadNav: {
            screen: HeadNav,
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        SMSLanding: {
            screen: SMSLanding,
            navigationOptions: {
                header: null,
            }
        },
        RestPass: {
            screen: RestPass,
            navigationOptions: {
                header: null,
            }
        },
        Game: {
            screen: Game,
            navigationOptions: {
                header: null,
            }
        },
        Pact: {
            screen: Pact,
            navigationOptions: {
                header: null,
            }
        },

    },
    {initialRouteName: 'Home'});

export default SimpleApp;