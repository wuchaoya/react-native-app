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
            <View>
                <Image
                    resizeMode="cover" style={styles.container}
                    source={require('../static/img/game_vidoe.png')}>
                   <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.4)'}]}>
                        <TouchableOpacity activeOpacity={0.9}
                                          onPress={
                                              () => {
                                                  RNInteraction.playVideoByUrl()
                                              }
                                          }>
                            {this.state.data.video_url?<Image
                                style={{width: 50, height: 50}}
                                source={require('../static/img/video_play.png')}/>:null}
                        </TouchableOpacity>
                   </View>
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

