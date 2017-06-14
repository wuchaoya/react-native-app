
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class HomeComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={200}
                        showsButtons={true}
                        paginationStyle={{bottom:10}}
                        dot={<View style={{width:8,height:8,backgroundColor:'white',borderRadius:4,marginLeft:3,marginRight:3}}></View>}
                        activeDot={<View style={{width:8,height:8,backgroundColor:'orange',borderRadius:4,marginLeft:3,marginRight:3}}></View>}
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
    }
});