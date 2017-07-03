/**
 * 精选游戏列表页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import HeadNav from '../components/HeadNav'
import GameList from '../components/GameList'
import HttpRequest from '../common/HttpRequest'

export default class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:0,
            data:null
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{flex:1}} >
                <HeadNav header="游戏列表"  onPress={() => goBack()}  />
                {this.state.data!==null?<GameList data={this.state.data} navigation = {this.props.navigation} />:null}
            </View>
        );
    }

    getGameListData(){
        HttpRequest.getGameListData(
            {page:this.state.page},
            (responseData)=>{
                console.log(responseData)
                this.setState({
                  data:responseData
                },()=>{
                    console.log(this.state.data)
                })
            },
            (error)=>{}

        )
    }

    componentDidMount() {
        this.gameListPullRelease= DeviceEventEmitter.addListener('gameListPullRelease',(listenerMsg) => {
            console.log('刷新')
            this.setState({
                page:0
            },()=>{
                HttpRequest.getGameListData(
                    {page:this.state.page},
                    (responseData)=>{
                        DeviceEventEmitter.emit('onLoadGameList', responseData)
                    },
                    (error)=>{}

                )
            })
        });
        this.gameListloadMore= DeviceEventEmitter.addListener('gameListloadMore',(listenerMsg) => {
            let page = this.state.page+1,data=listenerMsg
            this.setState({
                page:page,
            },()=>{
                HttpRequest.getGameListData(
                    {page:this.state.page},
                    (responseData)=>{
                       data=data.concat(responseData)
                        DeviceEventEmitter.emit('gameListloadData', data)
                    },
                    (error)=>{}

                )
            })
        });

    }

    componentWillMount(){
        this.getGameListData()
    }
}

const styles = StyleSheet.create({});


