/**
 * 我的页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import {Button} from 'native-base';

export default class UserContainer extends Component {
    render() {
        return (
            <View style={styles.centering}>
                {/*顶部导航*/}

                {/*用户头像*/}
                <View style={styles.topImg}>
                    <Image style={styles.icon_setup} source={require('../static/img/setting_icon.png')}/>
                    <Image source={require('../static/img/user_head_icon.jpg')}/>
                    <Text style={{color: '#fff', paddingTop: 4}}>18695912990</Text>
                </View>
                {/*会员购买*/}
                <Text style={styles.text_vip}>会员购买</Text>
                {/*15块*/}
                <View style={[styles.card, {borderColor: '#F4A460', backgroundColor: '#FAF0E6',}]}>
                    <Text style={[styles.fonSize_13]}>咪咕娱乐云游戏尊享包</Text>
                    <Text style={styles.fonSize_13}><Text style={styles.color_darkorange}>15 </Text>元/月</Text>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button rounded style={{height: 30, backgroundColor: 'darkorange'}}>
                            <Text style={[styles.fonSize_13, {color: 'white'}]}>开通</Text>
                        </Button>
                    </View>

                </View>
                {/*6块*/}
                <View style={[styles.card, {borderColor: '#DDDDDD', backgroundColor: '#fff',}]}>
                    <Text style={[styles.fonSize_13]}>咪咕娱乐云游戏精选包</Text>
                    <Text style={styles.fonSize_13}><Text style={styles.color_darkorange}>6 </Text>元/月</Text>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button rounded style={{height: 30, backgroundColor: 'rgba(109, 174, 49, 1)'}}>
                            <Text style={[styles.fonSize_13, {color: 'white'}]}>开通</Text>
                        </Button>
                    </View>
                </View>
                <Text style={styles.text_vip}>会员权益</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centering: {
        flex: 1,
        backgroundColor: "darkgray",
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginTop: 14,
    },
    topImg: {
        backgroundColor: 'rgba(109, 174, 49, 1)',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(121, 121, 121, 1)',

    },
    icon_setup: {
        position: 'absolute',
        top: 17,
        right: 17,
        width: 30,
        height: 30,
    },
    text_vip: {
        fontFamily: 'Arial',
        fontWeight: "800",
        fontStyle: 'normal',
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 6,
    },
    card: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,

    },
    fonSize_13: {
        fontSize: 13
    },
    color_darkorange: {
        color: 'darkorange',
        fontSize: 16,
    },
});

