/**
 * Created by wuchao on 2017/6/16.
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
import ColorStyle from '../style/ColorStyle'
export default class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View style={styles.head}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    head: {
        height:60,
        backgroundColor:ColorStyle.colorGreen,
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:ColorStyle.colorWhite,
        fontFamily:'Arial',
    }

});

