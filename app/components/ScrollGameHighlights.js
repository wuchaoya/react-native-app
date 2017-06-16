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
                <Text numberOfLines={2} style={{width:86}}>{text}</Text>
            </View>
        )
    }
    render() {
        return (
            <ScrollView horizontal={true} >
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[0])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[0])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[1])}
                {this._renderImg(require('../static/img/user_head_icon.jpg'),TextConst.HomeContainerText.gameHighlights.gameList[1])}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight:12,
        marginBottom:18,
    },
    radiuImg:{
        width:86,
        height:86,
        borderRadius:18,
    }
});

