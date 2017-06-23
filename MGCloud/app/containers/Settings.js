import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import HeadNav from '../components/HeadNav'
import TransparentStatusBar    from '../components/TransparentStatusBar'
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { goBack } = this.props.navigation;
        console.log(this.props.navigation)
        return (
            <View style={styles.container}>
                <TransparentStatusBar/>
                <HeadNav header="设置"  onPress={() => goBack()} />
                <View style={{  paddingLeft:12,paddingRight:12,backgroundColor:'#fff',}}>
                    <View style={styles.conter}>
                        <Text style={styles.text}>用户服务协议</Text>
                        <Text style={styles.text}>＞</Text>
                    </View>
                    <View style={[styles.conter,{marginTop:0,borderTopWidth: 1,borderTopColor:'#ededed'}]}>
                        <Text style={styles.text}>用户服务协议</Text>
                        <Text style={styles.text}>＞</Text>
                    </View>
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
    }
});

