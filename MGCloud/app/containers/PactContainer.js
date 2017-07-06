import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import Gallery from 'react-native-gallery';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (
            <Gallery
                onSingleTapConfirmed={()=>{
                    alert('haha')
                }}
                style={{flex: 1, backgroundColor: 'black'}}
                images={[
                    'http://ww2.sinaimg.cn/mw690/714a59a7tw1dxqkkg0cwlj.jpg',
                    'http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg'
                ]}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        justifyContent:'center',
        alignItems:'center'
    },
});