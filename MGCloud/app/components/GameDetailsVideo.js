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
            <View style={this.props.data.cover==''?{
                height: 200,
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
            backgroundColor:'rgb(221,221,221)'}:{}}>
                <Image
                    resizeMode="cover" style={this.props.data.cover==""?{width:40,height:30}:styles.container}
                    source={this.props.data.cover==""?require('../static/img/error.png'):{uri:this.props.data.cover}}
                >
                    {this.props.data.cover!==""?<View style={this.props.data.video_url==""?null:[styles.container,{backgroundColor:'rgba(0,0,0,0.4)'}]}>
                        <TouchableOpacity activeOpacity={0.9}
                                          onPress={
                                              () => {
                                                  RNInteraction.playVideoByUrl(this.props.data.video_url)
                                              }
                                          }>
                            {this.props.data.video_url?<Image
                                style={{width: 50, height: 50}}
                                source={require('../static/img/video_play.png')}/>:null}
                        </TouchableOpacity>
                    </View>:null}
                </Image>

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

