/**
 * 首页页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import Banner from '../components/ScrollBanner';
import Title from '../components/Title'
import CommonStyle from '../style/CommonStyle'
import TextConst from '../const/TextConst'
import ScrollGameThemes from '../components/ScrollGameThemes'
import ScrollGameHighlights from '../components/ScrollGameHighlights'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <HeadNav header="云游戏" onPress={() => navigate('Home')}/>
                <View style={styles.container}>
                    <Banner navigation={this.props.navigation}/>
                    <View style={CommonStyle.container}>
                        <Title
                            titleText={TextConst.HomeContainerText.gameTheme.title}
                            color="#000"
                        ></Title>
                        <Text style={styles.subtitle}>{TextConst.HomeContainerText.gameTheme.subtitle}</Text>
                        <ScrollGameThemes navigation={this.props.navigation}></ScrollGameThemes>
                    </View>
                    <View style={[{marginTop: 12, paddingTop: 12, backgroundColor: ColorStyle.colorWhite}]}>
                        <View style={styles.homeContainer}>
                            <Title color="#000" titleText={TextConst.HomeContainerText.gameHighlights.title}></Title>
                            <Text onPress={() => navigate('GameDetails')}
                                  style={styles.more}>{TextConst.HomeContainerText.gameHighlights.more}</Text>
                        </View>
                        <ScrollGameHighlights navigation={this.props.navigation}></ScrollGameHighlights>
                    </View>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        HttpRequest.getHomeData('',
            (responseData)=> {
                console.log('网络请求成功了,开始刷新页面' + responseData.code + responseData.data);
            },
            (responseData)=> {
                console.log('网络请求失败了' + responseData.code);
            });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.colorLightSteelGray,
    },
    subtitle: {
        marginTop: 12,
        color: '#999'
    },
    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginRight: 12,
        paddingLeft: 12,
    },
    more: {
        color: ColorStyle.colorGreen
    }

});
