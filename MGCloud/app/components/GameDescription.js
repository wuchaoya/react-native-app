import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,

} from 'react-native';
import {Button } from 'native-base';
import Title from '../components/Title'
export default class GameDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberLine:4
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title titleText="游戏简介" fontSize={15} color='#000'/>
                <Text numberOfLines={this.state.numberLine}   style={{marginTop:8,fontSize:12,color:'#333',lineHeight:20}}>
                    center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同
                    center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐
                    center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐
                    。center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
                </Text>
                <View style={{alignSelf:'center'}}>
                    <Button transparent onPress={() =>{this.setState(
                    {numberLine:1} ) }}>
                        <Text  style={{fontSize:12,color:'#83b233'}}>显示全文</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       backgroundColor:'#fff',
        paddingTop:15,
        paddingLeft:15,
        borderTopWidth:1,
        borderTopColor:'#ededed',
        paddingRight:15
    },

});

