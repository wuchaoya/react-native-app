import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import { Button} from 'native-base';
import ComStyle from '../style/CommonStyle'
import UserHead from '../components/UserHead'
import TextConst from '../const/TextConst'

const marginTopNmuber = StatusBar.currentHeight

export default class user extends Component {
    render() {
        return (
            <View style={styles.centering}>
                <UserHead/>
                <Text style={styles.text_vip}>{TextConst.VipBuyText.title}</Text>
                <View style={[styles.card,{ borderColor:'#F4A460',backgroundColor:'#FAF0E6',}]}>
                    <Text style={[styles.fonSize_13]}>{TextConst.VipBuyText.Exclusive.name}</Text>
                    <Text style={styles.fonSize_13}><Text style={styles.color_darkorange}>{TextConst.VipBuyText.Exclusive.Price}</Text>{TextConst.VipBuyText.Exclusive.SingleMonth}</Text>
                    <View style={{alignItems:'flex-end'}}>
                        <Button rounded  style={{height:30,backgroundColor:'darkorange'}}>
                            <Text style={[styles.fonSize_13,{color:'white'}]}>{TextConst.VipBuyText.Exclusive.open}</Text>
                        </Button>
                    </View>
                </View>
                <View style={[styles.card,{ borderColor:'#DDDDDD',backgroundColor:'#fff',}]}>
                    <Text style={[styles.fonSize_13]}>{TextConst.VipBuyText.Featured.name}</Text>
                    <Text style={styles.fonSize_13}><Text style={styles.color_darkorange}>{TextConst.VipBuyText.Featured.Price}</Text>{TextConst.VipBuyText.Featured.SingleMonth}</Text>
                    <View style={{alignItems:'flex-end'}}>
                        <Button rounded  style={{height:30,backgroundColor:'rgba(109, 174, 49, 1)'}}>
                            <Text style={[styles.fonSize_13,{color:'white'}]}>{TextConst.VipBuyText.Featured.open}</Text>
                        </Button>
                    </View>
                </View>
                <Text style={styles.text_vip}>{TextConst.equityText.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centering: {
        flex:1,
        backgroundColor:"darkgray",
        flexDirection:'column',
        backgroundColor:'#fff',

    },
    topImg: {
        backgroundColor: 'rgba(109, 174, 49, 1)',
        height:140,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'rgba(121, 121, 121, 1)',
        paddingTop:marginTopNmuber
    },
    icon_setup:{
        position: 'absolute',
        top: 17+marginTopNmuber,
        right:17,
        width:30,
        height:30,
    },
    text_vip: {
        fontFamily: 'Arial',
        fontWeight:"800",
        fontStyle: 'normal',
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
        alignSelf:'flex-start',
        marginTop:10,
        marginLeft:6,
    },
    card:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginLeft:4,
        marginRight:4,
        marginTop:10,
        borderRadius:10,
        borderWidth:1,

    },
    fonSize_13:{
        fontSize:13
    },
    color_darkorange:{
        color:'darkorange',
        fontSize: 16,
    },
});

