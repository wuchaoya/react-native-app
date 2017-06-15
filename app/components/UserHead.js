import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import TextConst from '../const/TextConst'
const marginTopNmuber = StatusBar.currentHeight
export default class UserHead extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image  style={styles.iconSetup} source={require('../static/img/setting_icon.png')} />
                <Image source={require('../static/img/user_head_icon.jpg')} />
                <Text style={styles.userNameText}>{TextConst.UserHeadText.userNameText}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:ColorStyle.colorGreen,
        height:140,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:ColorStyle.colorGray,
        paddingTop:marginTopNmuber
    },
    iconSetup:{
        position: 'absolute',
        top: 17+marginTopNmuber,
        right:17,
        width:30,
        height:30,
    },
    userNameText:{
        color:'#fff',
        paddingTop:4
    }
});
