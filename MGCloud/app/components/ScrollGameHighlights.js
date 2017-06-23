import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    ScrollView
} from 'react-native';
import TextConst from '../const/TextConst'

export default class ScrollGameHighlights extends Component {
    _renderImg(img,text){
        return(
            <View style={styles.container}>
                <Image style={styles.radiuImg} source={img} />
                <Text numberOfLines={2} style={{width:86,color:'#333',fontSize:13}}>{text}</Text>
            </View>
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

