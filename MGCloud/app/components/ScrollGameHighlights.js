/**
 * 游戏精选
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity
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

            <TouchableOpacity activeOpacity={0.9} onPress={() =>this.props.navigation.navigate('GameDetails')} style={styles.container}>
                <Image style={styles.radiuImg} source={img} />

            </TouchableOpacity>
        )
    }
    render() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  showsHorizontalScrollIndicato={false}>
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

