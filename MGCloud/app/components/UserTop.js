import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
const marginTopNmuber = StatusBar.currentHeight

export default class UserTop extends Component {
    render() {
        return (
            <View style={styles.topImg}>
                <Image  style={styles.icon_setup} source={require('../static/img/icon-setup.png')} />
                <Image source={require('../static/img/icon-user-tile.jpg')} />
                <Text style={{color:'#fff',paddingTop:4}}>18695912990</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:ColorStyle.color_green,
        height:140,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'rgba(121, 121, 121, 1)',
        paddingTop:marginTopNmuber
    },
});
