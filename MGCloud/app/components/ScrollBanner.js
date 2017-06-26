import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import ColorStyle from '../style/ColorStyle'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class HomeComponent extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={200}
                        loop
                        autoplay
                        showsButtons={false}
                        paginationStyle={{bottom: 9,right:15,justifyContent:'flex-end'}}
                        autoplayTimeout={3}
                        dot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorSlateGray}]}></View>}
                        activeDot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorGreenYellow}]}></View>}
                >
                    <TouchableHighlight onPress={() => navigate('GameDetails')} style={styles.slide1}>
                      <Image style={{width:width}} resizeMode='stretch'  source={require('../static/img/1.jpg')}></Image>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.slide2} onPress={() => navigate('GameDetails')}>
                        <Image style={{width:width}} resizeMode='stretch'  source={require('../static/img/2.jpg')}></Image>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => navigate('GameDetails')} style={styles.slide3}>
                        <Image style={{width:width}} resizeMode='stretch'  source={require('../static/img/3.jpg')}></Image>
                    </TouchableHighlight>

                </Swiper>
            </View>
        );
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
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
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