/**
 * 会员购买游戏包组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import ComStyle from '../style/CommonStyle'
import TextConst from '../const/TextConst'
import { Button} from 'native-base';
import ColorStyle from '../style/ColorStyle'
export default class VipBuy extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    _render(isShow){
        if(isShow){
            return (

                    <Image  style={styles.recommendIcon} source={require('../static/img/radius_icon.png')}>
                        <Text style={styles.recommendText}>荐</Text>
                    </Image>

            )
        }
    }
    render() {
        return (
            <View style={[styles.card,{ borderColor:this.props.borderColor,backgroundColor:this.props.backgroundColor,}]}>
                {this._render(this.props.recommend)}
                <Text style={[styles.fonSize_13]}>{this.props.name}</Text>
                <Text style={styles.fonSize_13}><Text style={styles.color_darkorange}>{this.props.price}</Text>{this.props.time}</Text>
                <View style={{alignItems:'flex-end'}}>
                    <Button onPress={this.props.onPress} rounded  style={{height:30,backgroundColor:this.props.buttonColor}}>
                        <Text style={[styles.fonSize_13,{color:'white'}]}>{this.props.buttonText}</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginLeft:3,
        marginRight:3,
        marginBottom:6,
        borderRadius:6,
        borderWidth:1,

    },
    fonSize_13:{
        fontSize:13
    },
    color_darkorange:{
        color:'darkorange',
        fontSize: 15,
    },
    recommendIcon:{
        height:30,
        width:30,
        position: 'absolute',
        top: 0,
        left:0,
    },
    recommendText:{
        fontSize:10,
        color:'#fff',
        marginTop:3,
        marginLeft:4,
        backgroundColor:'rgba(0,0,0,0)'//ios下不设置背景色为透明会导致无法显示
    }

});

