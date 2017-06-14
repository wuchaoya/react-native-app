import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
}

export default class extends Component {
    render () {
        return (
            <View>
                <Swiper style={styles.wrapper} height={200} horizontal={false} autoplay>
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

                <Swiper style={styles.wrapper} height={240}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
                    <View style={styles.slide} title={<Text numberOfLines={1}>1</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../static/img/u53.png')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>2</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../static/img/u55.png')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>3</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../static/img/u57.png')} />
                    </View>
                </Swiper>
            </View>
        )
    }
}

