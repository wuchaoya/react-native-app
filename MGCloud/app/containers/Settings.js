/**
 * 设置
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import HeadNav from '../components/HeadNav'
import TransparentStatusBar    from '../components/TransparentStatusBar'
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { goBack,navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TransparentStatusBar/>
                <HeadNav header="设置"  onPress={() => goBack()} />
                <View style={{  paddingLeft:12,paddingRight:12,backgroundColor:'#fff',}}>
                    <TouchableOpacity
                        activeOpacity={0.9} style={styles.conter} onPress={() => navigate('Pact')}>
                        <Text style={styles.text} >用户服务协议</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Pact')}
                        activeOpacity={0.9}
                        style={[styles.conter,{marginTop:0,borderTopWidth: 1,borderTopColor:'#ededed'}]}>
                        <Text style={styles.text}>联系客服</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent:'center',alignItems:'center',height:53,marginTop:6,backgroundColor:'#fff',}}>
                    <Text style={styles.text}>退出登录</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    backgroundColor:'#ededed'
    },
    conter:{
        marginTop:6,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:53
    },
    text:{
        fontSize:14,
        color:'#333'
    },
    nextImg:{
        width:5,
        height:9
    }
});

