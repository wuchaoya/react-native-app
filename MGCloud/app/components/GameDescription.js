/**
 * 游戏简介
 */
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
            numberLine:4,
            data:this.props.data
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title titleText="游戏简介" fontSize={15} color='#000'/>
                <Text numberOfLines={this.state.numberLine}   style={{marginTop:8,fontSize:12,color:'#333',lineHeight:20}}>
                    {this.state.data.content}
                </Text>
                <View style={{alignSelf:'center'}}>
                    <Button transparent onPress={() =>{this.setState(
                    {numberLine:this.state.numberLine===null?4:null} ) }}>
                        <Text  style={{fontSize:12,color:'#83b233'}}>{this.state.numberLine===null?'收起':'显示全文'}</Text>
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

