import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper'



let width = Dimensions.get('window').width;
let widthPixels = width
let heightPixels = Dimensions.get('window').height
console.log(heightPixels)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:0,
            isTouchDetails:false
        }
    }

    render () {
        const { navigate } = this.props.navigation;
        return (

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  showsHorizontalScrollIndicato={false}>
                    {this.props.data.map((obj,i)=>{
                     return ( <View style={[styles.slide,i==0?{ marginLeft:12}:null]} key={i} title={<Text numberOfLines={1}></Text>}>
                            <TouchableOpacity activeOpacity={0.8}
                                              onPress={() => {
                                                  if(this.state.isTouchDetails){
                                                      return
                                                  }
                                                  this.setState({
                                                      isTouchDetails:true
                                                  },()=>{
                                                      navigate('TopicDetails',{did:obj.did,name:obj.title})
                                                      setTimeout(()=>{
                                                         this.setState({
                                                             isTouchDetails:false
                                                         })
                                                      },1000)
                                                  })
                                              }} style={styles.image}>
                                <View style={styles.image}>
                                    <Image resizeMode='stretch' style={{flex: 1,width:this.state.width,height:350/2}} source={{uri:obj.cover}}  />
                                    <View style={{height:52,justifyContent:'center',marginTop:-3}}>
                                        <Text style={{fontSize:15,color:'#333',}}>{obj.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>)
                    })}
                </ScrollView>

        )
    }
    componentDidMount(){
        Image.getSize(this.props.data[0].cover, (width, height) => {
            console.log(height/heightPixels)
            this.setState(
                {width:325
                //width*(height/heightPixels)
                 }
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
        paddingBottom:0,

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
