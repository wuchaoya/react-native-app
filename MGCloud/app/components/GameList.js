import React, {Component} from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from'react-native';
import {Button} from 'native-base';
import Star from './Star'
import RNInteraction from '../common/RNInteraction'

export default class GameList extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data),
            isRefreshing: false,
        };
    }

    _renderRow(rowData, sectionID, rowID, highlightRow, navigate) {
        console.log(navigate)
        return (
            <TouchableOpacity onPress={() => navigate('GameDetails')}>
                <View>
                    <View style={styles.row}>
                        <View style={{width: 30,}}>
                            <Text style={[{
                                fontSize: 20,
                                alignSelf: 'center'
                            }, Number(rowID) < 3 ? {color: '#ff8800'} : {
                                    color: '#999',
                                    fontSize: 15
                                }]}>{Number(rowID) + 1}</Text>
                        </View>
                        <Image style={styles.thumb} source={rowData.gameImg}/>
                        <View style={{width: 100}}>
                            <Text numberOfLines={1} style={styles.gameName}>{rowData.gameName}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Star starNumber={rowData.gameStar} textStyle={{fontSize: 12}}></Star>
                                <Text style={{fontSize: 12, marginLeft: 4}}>{rowData.gameStar}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={styles.gameClass}
                                >
                                    <Text style={{fontSize: 11}}>{rowData.gameClass[0]}</Text>
                                </View>
                                <View style={styles.gameClass}>
                                    <Text style={{fontSize: 11}}>{rowData.gameClass[1]}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: 90,
                        }}>
                            <Button
                                bordered={!rowData.gamePlayed}
                                rounded
                                success
                                style=
                                    {
                                        rowData.gamePlayed !== undefined ?
                                            (rowData.gamePlayed ?
                                                {
                                                    backgroundColor: '#DDDDDD',
                                                    height: 30,
                                                    paddingLeft: 20,
                                                    paddingRight: 20,
                                                } :
                                                {
                                                    borderColor: '#6dae31',
                                                    height: 30,
                                                }) :
                                            (rowData.gameReserve ?
                                                    {
                                                        borderColor: '#dddddd',
                                                        height: 30,
                                                        paddingLeft: 20,
                                                        paddingRight: 20,
                                                    } :
                                                    {
                                                        borderColor: '#6dae31',
                                                        height: 30,
                                                    }
                                            )
                                    }
                                onPress={
                                    () => {
                                        RNInteraction.startCloudPlay()
                                    }
                                }

                            >
                                <Text style={{fontSize: 10, margin: 0, padding: 0}}>
                                    {
                                        rowData.gamePlayed !== undefined ?
                                            (rowData.gamePlayed ? '试玩结束' : '试玩') :
                                            (rowData.gameReserve ? '取消预约' : '预约')
                                    }
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {

            this.setState({
                isRefreshing: false,
            });
        }, 2000);
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log(navigate)
        return (
            <ListView
                onEndReached={console.log('正在加载')}
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow, navigate)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法

                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 1,
        borderTopColor: '#ededed',
        backgroundColor: '#fff'
    },
    thumb: {
        width: 84,
        height: 84,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    gameName: {
        color: '#000',
        fontSize: 16,
    },
    gameClass: {
        borderColor: '#cccccc',
        borderWidth: 1,
        paddingBottom: 2,
        paddingTop: 2,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 4
    }
});

