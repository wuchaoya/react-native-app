import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity

} from 'react-native'
import Swiper from 'react-native-swiper'



let width = Dimensions.get('window').width;
let widthPixels = width
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:0
        }
    }
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Swiper style={styles.wrapper} height={227}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 0, height: 0, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 0, height: 0, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
            bottom: -20,left:-10
          }}
                        loop>
                    {this.props.data.map((obj,i)=>{
                     return ( <View style={styles.slide} key={i} title={<Text numberOfLines={1}></Text>}>
                            <TouchableOpacity activeOpacity={0.8}
                                              onPress={() => navigate('TopicDetails')} style={styles.image}>
                                <View style={styles.image}>
                                    <Image resizeMode='stretch' style={{flex: 1,width:width-24,height:this.state.height}} source={{uri:obj.cover}}  />
                                    <View style={{height:52,justifyContent:'center'}}>
                                        <Text style={{fontSize:15,color:'#333',}}>{obj.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>)
                    })}
                </Swiper>
            </View>
        )
    }
    componentDidMount(){
        Image.getSize(this.props.data[0].cover, (width, height) => {
            this.setState(
                {height:height/(width/widthPixels)}
            )
        });
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
    }
}
