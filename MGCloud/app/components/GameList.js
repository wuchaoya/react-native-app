import React, {Component} from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
} from'react-native';
import {Button } from 'native-base';
import Star from './Star'
const THUMB_URLS = [
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
    require('../static/img/user_head_icon.jpg'),
];

export default class GameList extends Component{
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    }
    _renderRow(rowData,sectionID, rowID) {
        return (
            <TouchableOpacity>
                <View>
                    <View style={styles.row}>
                        <Text style={[{fontSize:20},Number(rowID)<3?{color:'#ff8800'}:{color:'#dddddd'}]}>{Number(rowID)+1}</Text>
                        <Image style={styles.thumb} source={rowData.gameImg} />
                        <View style={{width:160}}>
                            <Text style={styles.gameName}>{rowData.gameName}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Star starNumber={rowData.gameStar}style={{fontSize:12}}></Star>
                                <Text style={{fontSize:12,marginLeft:4}}>{rowData.gameStar}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View
                                        style={styles.gameClass}
                                >
                                    <Text style={{fontSize:11}}>{rowData.gameClass[0]}</Text>
                                </View>
                                <View style={styles.gameClass}>
                                    <Text style={{fontSize:11}}>{rowData.gameClass[1]}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Button
                                bordered={!rowData.gamePlayed}
                                rounded
                                success
                                style=
                                    {
                                        rowData.gamePlayed!==undefined?
                                            (rowData.gamePlayed?
                                            {
                                                backgroundColor:'#DDDDDD',
                                                height: 30,
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                            }:
                                            {
                                            borderColor: '#6dae31',
                                            height: 30,
                                            }):
                                            (rowData.gameReserve?
                                                {
                                                borderColor: '#dddddd',
                                                height: 30,
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                            }:
                                            {
                                            borderColor: '#6dae31',
                                            height: 30,
                                            }
                                            )
                                    }
                            >
                                <Text style={{fontSize: 10,margin: 0,padding:0}}>
                                    {
                                        rowData.gamePlayed!==undefined?
                                            (rowData.gamePlayed?'试玩结束':'试玩'):
                                            (rowData.gameReserve?'取消预约':'预约')
                                    }
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        );
    }
}
const styles =StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        paddingTop:15,
        borderTopWidth:1,
        borderTopColor:'#dddddd',
        // marginBottom:10,
        marginTop:10
    },
    thumb: {
        width: 80,
        height: 80,
        borderRadius:15
    },
    gameName:{
       color:'#000000',
       fontSize:16
    },
    gameClass:{
        borderColor:'#cccccc',
        borderWidth:1,
        paddingBottom:2,
        paddingTop:2,
        paddingLeft:4,
        paddingRight:4,
        marginTop:10,
        marginRight:10,
        borderRadius:4
    }
});

