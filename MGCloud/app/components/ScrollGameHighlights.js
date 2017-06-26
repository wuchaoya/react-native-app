import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import TextConst from '../const/TextConst'

export default class ScrollGameHighlights extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _renderImg(img,text){
        return(

            <TouchableHighlight onPress={() =>this.props.navigation.navigate('GameDetails')} style={styles.container}>
                <Image style={styles.radiuImg} source={img} />

            </TouchableHighlight>
        )
    }
    render() {
        return (
            <ScrollView horizontal={true} >
                {this._renderImg(require('../static/img/game1_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[0])}
                {this._renderImg(require('../static/img/game2_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[0])}
                {this._renderImg(require('../static/img/game1_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/game3_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/game2_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/game3_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/game1_img.png'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:12,
        marginBottom:18,
    },
    radiuImg:{
        width:86,
        height:86,
        borderRadius:18,
        marginBottom:9
    }
});

