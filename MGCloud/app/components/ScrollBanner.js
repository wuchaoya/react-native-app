/**
 * 首页顶部轮播图
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import ColorStyle from '../style/ColorStyle'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
let widthPixels = width
export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            imgList: [],
            isTouchBanner:false
        }
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={144}
                        loop
                        autoplay
                        showsButtons={false}
                        paginationStyle={{bottom: 9, right: 15, justifyContent: 'flex-end'}}
                        autoplayTimeout={3}
                        dot={<View style={[styles.dot, {backgroundColor: ColorStyle.colorSlateGray}]}></View>}
                        activeDot={<View style={[styles.dot, {backgroundColor: ColorStyle.colorGreenYellow}]}></View>}
                >
                    {
                        this.props.data.map((obj, i)=> {

                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={0.8}
                                    onPress={
                                        () => {
                                            if(this.state.isTouchBanner){
                                                return
                                            }
                                            this.setState({
                                                isTouchBanner:true
                                            },()=>{
                                                navigate('GameDetails', {gid: obj.gid})
                                                setTimeout(()=>{
                                                    this.setState({
                                                        isTouchBanner:false
                                                    })
                                                },1000)
                                            })
                                           }}
                                    style={[this.state.imgList[i] == '' ? {backgroundColor: '#ddd'} : {}, styles.slide1]}
                                >
                                    <Image
                                        style={[this.state.imgList[i] == '' ? {width: 40, height: 30} : {
                                            width: width,
                                            height: 144
                                        }]}
                                        resizeMode='stretch'
                                        source={this.state.imgList[i] == '' ? require('../static/img/error.png') : {uri: obj.cover}}
                                    >

                                    </Image>
                                </TouchableOpacity>)
                        })
                    }

                </Swiper>
            </View>
        );
    }

    componentDidMount() {
        this.props.data.map((item, i)=> {
            Image.getSize(item.cover, (width, height) => {
                    let arr = this.state.imgList
                    arr[i] = item.cover
                    this.setState({
                        imgList: arr
                    })
                },
                (error)=> {
                    let arr = this.state.imgList
                    arr[i] = ''
                    this.setState({
                        imgList: arr
                    })
                }
            );
        })

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    wrapper: {},
    slide1: {
        width: width,
        height: 144,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    }
});