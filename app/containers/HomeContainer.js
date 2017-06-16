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

const marginTopNmuber = StatusBar.currentHeight

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        <ScrollView>
            <View style={styles.container}>
                <Banner/>
                <View style={CommonStyle.container}>
                    <Title titleText={TextConst.HomeContainerText.gameTheme.title}></Title>
                    <Text style={styles.subtitle}>{TextConst.HomeContainerText.gameTheme.subtitle}</Text>
                    <ScrollGameThemes></ScrollGameThemes>
                </View>
                <View style={CommonStyle.container}>
                    <View style={styles.homeContainer}>
                        <Title titleText={TextConst.HomeContainerText.gameHighlights.title}></Title>
                        <Text style={styles.more}>{TextConst.HomeContainerText.gameHighlights.more}</Text>
                    </View>
                    <ScrollGameHighlights></ScrollGameHighlights>
                </View>
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:ColorStyle.colorLightSteelGray,
    },
    subtitle:{
        marginTop:12,
        marginBottom:12
    },
    homeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:12,
        marginRight:12
    },
    more:{
        color:ColorStyle.colorGreen
    }

});

