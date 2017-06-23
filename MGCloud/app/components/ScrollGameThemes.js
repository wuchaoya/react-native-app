import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native'
import Swiper from 'react-native-swiper'

import HttpUitl from '../common/HttpUitl'
import WebHost from '../common/WebHost'


let width = Dimensions.get('window').width;

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Swiper style={styles.wrapper} height={227}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
            bottom: -20,left:-10
          }}
                        loop>
                    <View style={styles.slide} title={<Text numberOfLines={1}>1</Text>}>
                        <TouchableHighlight onPress={() => navigate('TopicDetails')} style={styles.image}>
                           <View style={styles.image}>
                               <Image resizeMode='stretch' style={styles.image} source={require('../static/img/topic1.png')}  />
                               <View style={{height:52,justifyContent:'center'}}>
                                   <Text style={{fontSize:15,color:'#333',}}>机智如我</Text>
                               </View>
                           </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>2</Text>}>
                        <TouchableHighlight onPress={() => navigate('TopicDetails')} style={styles.image}>
                            <View style={styles.image}>
                                <Image resizeMode='stretch' style={styles.image} source={require('../static/img/game_vidoe.png')}  />
                                <View style={{height:52,justifyContent:'center'}}>
                                    <Text style={{fontSize:15,color:'#333',}}>机智如我</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>3</Text>}>
                        <TouchableHighlight onPress={() => navigate('TopicDetails')} style={styles.image}>
                            <View style={styles.image}>
                                <Image resizeMode='stretch' style={styles.image} source={require('../static/img/game3_img.png')}  />
                                <View style={{height:52,justifyContent:'center'}}>
                                    <Text style={{fontSize:15,color:'#333',}}>机智如我</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
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
        padding:12,
        paddingLeft:0,
        paddingBottom:0
    },


    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1,
        width:width-24,
        height:175
    }
}
