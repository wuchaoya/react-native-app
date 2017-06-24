import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import TextConst from '../const/TextConst'

export default class UserHead extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => navigate('Home')}  style={styles.back} >
                    <Image  style={{height:2,width:200}} source={require('../static/img/back_icon.png')} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigate('Settings')}  style={styles.iconSetup} >
                    <Image  style={{height:22,width:22}} source={require('../static/img/setting_icon.png')} />
                </TouchableHighlight>
                <View style={styles.headImgBorder}>
                    <Image style={styles.headImg} source={require('../static/img/topic1_head.png')}/>
                </View>
                <Text onPress={() => navigate('Login')}  style={styles.userNameText}>{TextConst.UserHeadText.userNameText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:ColorStyle.colorBlack,
        height:160,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:ColorStyle.colorGray,
    },
    back:{
        position: 'absolute',
        top: 32,
        left:12,
        width:18,
        height:16
    },
    iconSetup:{
        position: 'absolute',
        top: 32,
        right:12,
        width:22,
        height:22,
    },
    headImgBorder:{
        height:63,
        width:63,
        borderRadius:63/2,
        borderWidth:3,
        borderColor:ColorStyle.colorWhite,
        justifyContent: 'center',
        alignItems:'center',
    },
    headImg:{
        height:60,
        width:60,
        borderRadius:30

    },
    userNameText:{
        color:ColorStyle.colorWhite,
        marginTop:9,
        fontSize:15
    }
});
