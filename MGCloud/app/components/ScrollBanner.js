import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ColorStyle from '../style/ColorStyle'

export default class HomeComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={200}
                        loop
                        autoplay
                        showsButtons={false}
                        paginationStyle={{bottom:10}}
                        autoplayTimeout={3}
                        dot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorSlateGray}]}></View>}
                        activeDot={<View style={[styles.dot,{backgroundColor:ColorStyle.colorGreenYellow}]}></View>}
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>1</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>2</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>3</Text>
                    </View>
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