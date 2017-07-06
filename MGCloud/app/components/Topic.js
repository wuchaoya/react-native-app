/**
 * 游戏专题列表组件
 */
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
    _render(rowData,sectionID, rowID,highlightRow,navigate){
        const data = rowData
        console.log(data.cover=='')
        return (
        <TouchableHighlight>
            <View style={styles.container}>
                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={styles.headImg} source={data.icon==''?require('../static/img/erromMin.png'):{uri:data.icon}}></Image>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:'#000000'}}>{data.name}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {data.label.map((item,i)=>{

                              return( <GameClass conterStyle={{marginRight:3}} key={i} gameClassText ={item} style={{fontSize: 10}}/>)
                            })}
                            <Star starNumber = {data.score} style={{marginLeft:5}}></Star>
                            <Text style={{marginLeft:3,fontSize:12}}>{parseInt(data.score)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight style={[{justifyContent:'center',alignItems:'center',width:width-12,height:202},data.cover==''?{backgroundColor:'#ddd'}:{}]} onPress={() => navigate('GameDetails')}>
                    <Image style={data.cover==''?{width:40,height:30}:{width:width-12,height:202}}  resizeMode="cover"  source={data.cover==''?require('../static/img/error.png'):{uri:data.cover}}></Image>
                </TouchableHighlight>
                <View style={{marginLeft:10,marginBottom:18,marginTop:18,marginRight:10}}>
                    <Text style={{fontSize: 12,color:'#666666',lineHeight:20}}>{data.game_summary}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>)
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID, highlightRow,)=>this._render(rowData, sectionID, rowID, highlightRow,navigate)}
                scrollToEnd={{animated: true}}
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

