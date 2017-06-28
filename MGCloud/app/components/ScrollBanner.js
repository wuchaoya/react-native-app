/**
 * 首页顶部轮播图
 */
import React, { Component } from 'react';
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
            height:0
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={this.state.height}
                        loop
                        autoplay
                        showsButtons={false}
                        paginationStyle={{bottom: 9,right:15,justifyContent:'flex-end'}}
                        autoplayTimeout={3}
                        dot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorSlateGray}]}></View>}
                        activeDot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorGreenYellow}]}></View>}
                >
                    {
                        this.props.data.map((obj,i)=>{
                         return ( <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => navigate('GameDetails')} style={styles.slide1}>
                                <Image style={{width:width,height:this.state.height}} resizeMode='stretch'  source={{uri:obj.cover}}></Image>
                            </TouchableOpacity>)
                        })
                    }

                </Swiper>
            </View>
        );
    }
    componentDidMount(){
        Image.getSize(this.props.data[0].cover, (width, height) => {
          this.setState(
              {height:height/(width/widthPixels)}
          )
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    dot:{
        width:8,
        height:8,
        backgroundColor:'rgba(0,0,0,.2)',
        borderRadius:4,
        marginLeft:3,
        marginRight:3
    }
});