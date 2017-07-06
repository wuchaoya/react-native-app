import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import Gallery from 'react-native-gallery';

export default  class GameGallery extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Gallery
                onSingleTapConfirmed={this.props.onPress}
                style={{flex: 1,backgroundColor:'rgba(0,0,0,0.7)'}}
                images={this.props.images}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});