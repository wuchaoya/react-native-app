import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import RNInteraction from '../common/RNInteraction'

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

export default class GameDetailsVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        }
    }

    render() {
        return (
            <View style={{ height: 200,
                width: width,}}>
                {this.state.data?<View style={styles.container}>
                    <Image
                        resizeMode="cover" style={[this.state.data.cover==""?{width:40,height:30}:styles.container]}
                        source={this.state.data.cover==""?require('../static/img/error.png'):{uri:this.state.data.cover}}>
                        <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.4)'}]}>
                            <TouchableOpacity activeOpacity={0.9}
                                              onPress={
                                                  () => {
                                                      //RNInteraction.playVideoByUrl()
                                                  }
                                              }>
                                {this.state.data.video_url?<Image
                                    style={{width: 50, height: 50}}
                                    source={require('../static/img/video_play.png')}/>:null}
                            </TouchableOpacity>
                        </View>
                    </Image>
                    {()=>{
                        console.log(11111)
                    }}
                </View>:null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

