import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import TimerButton from '../components/test'
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
import  DeviceStorage from '../common/DeviceStorage'
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5,
            phoneNumber:'aaaa'
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
            phoneNumber
        });
    }
    render() {
        return (
            <View style={styles.container}>

                   <Text onPress={()=>{
                       DeviceStorage.save('name',['a','b',1,2,3])
                       alert('保存成功')
                   }}>
                       存
                   </Text>
                   <Text onPress={
                       ()=>{

                           DeviceStorage.get('name').then((v)=>{
                               console.log('取出来了')
                              console.log(v[0])
                          })
                       }
                   }>取</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        justifyContent:'center',
        alignItems:'center'
    },
});