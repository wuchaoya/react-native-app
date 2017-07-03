/**
 * 游戏详情其他组件
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
import Title from '../components/Title'
export default class GameOtherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        }
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
                       <Text style={[styles.textLeft,styles.textColor]}>{this.state.data.company}</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>{this.state.data.update_time}</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>{this.state.data.version}</Text>
                       <Text style={[styles.textLeft,styles.textColor]}>{this.state.data.size}</Text>
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
        lineHeight:24,
        height:24
    },
    textColor:{
        color:'#333'
    }

});

