/**
 * 游戏列表
 */
import React, {Component} from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    RefreshContro,
    ActivityIndicator,
    DeviceEventEmitter
} from'react-native';
import {Button} from 'native-base';
import Star from './Star'
import RNInteraction from '../common/RNInteraction'
import {PullList} from 'react-native-pull'
import LoadingAnimation from '../components/LoadingAnimation'
import GameClass from '../components/GameClass'

export default class GameList extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data),
            isRefreshing: false,
        };
        this.renderHeader = this.renderHeader.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    _renderNumber(isShow,ID){
        if(isShow===true){
            return ( <Text style={[{fontSize:20,alignSelf:'center'},Number(ID)<3?{color:'#ff8800'}:{color:'#999',fontSize:15}]}>{Number(ID)+1}</Text>
            )
        }

    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {

            this.setState({
                isRefreshing: false,
            });
        }, 2000);
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('GameDetails')}>
                <View>
                    <View style={[styles.row,{justifyContent:this.props.showNumber?'space-around':'space-between',}]}>
                        <View style={{width:this.props.showNumber?30:0,}}>
                            {this._renderNumber(this.props.showNumber,rowID)}
                        </View>
                        <Image style={styles.thumb} source={{uri:rowData.icon}}/>
                        <View style={{width: 100}}>
                            <Text numberOfLines={1} style={styles.gameName}>{rowData.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Star starNumber={rowData.score} textStyle={{fontSize: 12}}></Star>
                                <Text style={{fontSize: 12, marginLeft: 4}}>{parseInt(rowData.score)}</Text>
                            </View>
                            <View style={{flexDirection: 'row' ,width:120,flexWrap:'wrap'}}>
                                {
                                    rowData.label.length!==0?(rowData.label.map((item,i)=>{
                                    return(
                                        <GameClass conterStyle={{marginRight:6,marginTop:6}}  style={{fontSize:10}}  key={i} gameClassText={item}/>
                                    )
                                })):null
                                }

                            </View>
                        </View>
                        <View style={{width: 90,}}>
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
        )
    }


    /**
     * 列表头
     * @returns {XML}
     */
    renderHeader() {
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }

    /**
     * 列表底部
     * @returns {*}
     */
    renderFooter() {
        if(this.state.nomore) {
            return null;
        }
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }

    /**
     * 加载数据
     */
    loadMore() {

    }
    /**
     * 刷新
     */
    onPullRelease(resolve){
        //发送刷新
        DeviceEventEmitter.emit('PullRelease', true)
        this.onLoad= DeviceEventEmitter.addListener('onLoad',(listenerMsg) => {
            console.log('刷新完毕')
            this.onLoad.remove();
           resolve()
        });
    }

    /**
     *刷新状态
     */
    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60,backgroundColor:'#fff'}}>
                <LoadingAnimation style={{
                    marginRight:10
                }}/>
                <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>释放刷新</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>正在加载数据....</Text>
            </View>
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log(navigate)
        return (
            <PullList
                style={{backgroundColor:'#fff'}}
                onPullRelease={this.onPullRelease.bind(this)} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                renderHeader={null}
                dataSource={this.state.dataSource}
                pageSize={5}
                initialListSize={5}
                renderRow={this._renderRow.bind(this)}
                onEndReached={this.loadMore}
                onEndReachedThreshold={60}
                renderFooter={this.renderFooter}
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

