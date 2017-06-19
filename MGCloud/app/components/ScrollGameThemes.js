import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import HttpUitl from '../common/HttpUitl'
import WebHost from '../common/WebHost'
export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHomeBannerImg(){
        fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })
        }).then(function(response) {
            //获取数据,数据处理

            console.log(response)
            return response
        });
    }
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Swiper style={styles.wrapper} height={260}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
            bottom: -20,left:-10
          }}
                        loop>
                    <View style={styles.slide} title={<Text numberOfLines={1}>1</Text>}>
                        <TouchableHighlight onPress={() => navigate('TopicDetails')} style={styles.image}>
                            <Image resizeMode='stretch' style={styles.image} source={require('../static/img/u53.png')}  />
                        </TouchableHighlight>
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

const styles = {
    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // marginLeft:-18
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginLeft:-18
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        marginLeft:-18
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        marginLeft:-18
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1,
        width:374,
        height:280
    }
}
