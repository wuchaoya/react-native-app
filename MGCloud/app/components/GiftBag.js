import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';

export default class GiftBag extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.container,this.props.border?{ borderBottomWidth:1}:{ borderBottomWidth:0}]}>

                <View style={{alignItems:'center',}}>
                    <Text style={{fontSize:14,color:this.props.color}}>{this.props.name}</Text>
                    <View style={[styles.icon,{borderColor:this.props.color}]}>
                        <View style={[styles.lineX,{ backgroundColor:this.props.color}]}></View>
                        <View style={[styles.lineY,{backgroundColor:this.props.color}]}></View>
                    </View>
                    <Text style={{fontSize:11,color:this.props.color}}>{this.props.gameTimeText}</Text>
                </View>
                <View style={{marginLeft:15,alignSelf:'center'}}>
                    <Text style={styles.intro}>
                        {this.props.intro}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#ededed',
        paddingTop:12,
        paddingBottom:20,
    },
    giftBagImg:{
        width:33,
        height:33
    },
    intro:{
        fontSize:12,
        color:'#666666',
        lineHeight:17,
        marginRight:24,
        paddingRight:24
    },
    icon:{
        width:26,
        height:26,
        borderRadius:13,
        borderWidth:1,
        borderColor:'red',
        alignItems:'center',
        justifyContent:'center',
        margin:5
    },
    lineX:{
        width:1,
        height:6,
        backgroundColor:'red',
        marginTop:0
    },
    lineY:{
        width:1,
        height:8,
        backgroundColor:'red',
        marginTop:-2,
        marginLeft:6,
        transform:[{rotateZ:'120deg'}]
    }
});

