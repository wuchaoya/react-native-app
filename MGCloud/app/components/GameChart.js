/**
 * 游戏详情的图片组件
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

    DeviceEventEmitter
} from'react-native';
import {Button } from 'native-base';
import Star from './Star'
export default class GameChart extends Component{
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data.images),
            modalVisible:false,
            isShow:false
        };
    }
    hiden(){
        this.setState({

        })
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {

        return (
            <TouchableOpacity
                onPress={()=>{
                    DeviceEventEmitter.emit('Gallery', true)
                }}
                activeOpacity={0.7}
            >

                {this.state.isShow?<View style={{backgroundColor:'#fff'}}>
                    <Image resizeMode="cover" style={[styles.img,{width:this.state.imgwidth,height:this.state.imgheight}]} source={{uri:rowData}}></Image>
                </View>:null}
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.row}
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID, highlightRow)=>this._renderRow(rowData, sectionID, rowID, highlightRow)}
            />
        );
    }
    componentDidMount(){

            Image.getSize(this.props.data.images[0], (width, height) => {
                console.log('图片的宽高',width,height)
                    this.setState({
                        imgheight:height/2,
                        imgwidth:width/2
                    },()=>{
                        this.setState({
                            isShow:true
                        })
                    })
                },
                (error)=>{

                }
            );


    }
}

const styles =StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    img:{
        height:207,
        width:116,
        margin:9,
        marginRight:0
    }
});

