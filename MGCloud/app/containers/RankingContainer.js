/**
 * 排行页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import TextConst from '../const/TextConst'
import ColorStyle from '../style/ColorStyle'
import Star from '../components/Star'
import RankingTabNav from '../components/RankingTabNav'
export default class RankingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starNumber:1
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.title}>
                        {TextConst.RankingText.title}
                    </Text>

                </View>
                <RankingTabNav></RankingTabNav>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        height:60,
        backgroundColor:ColorStyle.colorGreen,
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:ColorStyle.colorWhite,
        fontFamily:'Arial',
    }
});

