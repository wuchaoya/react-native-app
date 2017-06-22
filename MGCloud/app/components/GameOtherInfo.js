import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import Title from '../components/Title'
export default class GameOtherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Title titleText="其他信息" fontSize={12} color="#000"/>
               <View style={{flexDirection: 'row'}}>
                   <View style={{marginTop:10,marginBottom:30}}>
                       <Text style={styles.textLeft}>开发商</Text>
                       <Text style={styles.textLeft}>更新日期</Text>
                       <Text style={styles.textLeft}>版本</Text>
                       <Text style={styles.textLeft}>大小</Text>
                   </View>
                   <View style={{marginTop:10,marginBottom:30,marginLeft:30}}>
                       <Text style={[styles.textLeft,styles.textColor]}>11 bit stodios s.2</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>2017.08.12</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>1.1.1</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>428MB</Text>
                   </View>
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginTop:6,
        paddingLeft:15,
        paddingTop:15
    },
    textLeft:{
        fontSize:12,
        color:'#999',
        lineHeight:24
    },
    textColor:{
        color:'#333'
    }

});

