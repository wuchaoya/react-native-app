import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TouchableHighlight,
    ListView
} from 'react-native';
import ComStyle from '../style/CommonStyle'
import Star  from '../components/Star'
import GameClass from './GameClass'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class Topic extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    }
    _render(rowData,sectionID, rowID){
        const data = rowData
        return (
        <TouchableHighlight>
            <View style={styles.container}>
                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={styles.headImg} source={data.headImg}></Image>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:'#000000'}}>{data.titleText}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <GameClass gameClassText ={data.gameClass[0]} style={{fontSize: 10}}/>
                            <Star starNumber = {data.starNumber} style={{marginLeft:5}}></Star>
                            <Text style={{marginLeft:3,fontSize:12}}>{data.starNumber}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Image style={{width:width-12,height:202}}  resizeMode="cover"  source={require('../static/img/topic1.png')}></Image>
                </View>
                <View style={{marginLeft:10,marginBottom:18,marginTop:18,marginRight:10}}>
                    <Text style={{fontSize: 12,color:'#666666',lineHeight:20}}>{data.summary}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>)
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._render}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom:12,
        marginLeft:6,
        marginRight:6,
        borderRadius:6,
        backgroundColor:'#ffffff'
    },
    headImg:{
        width:37,
        height:37,

        borderRadius:5
    }

});

