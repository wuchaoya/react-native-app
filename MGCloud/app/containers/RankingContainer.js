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
import ColorStyle from '../style/ColorStyle'
import RankingTabNav from '../components/RankingTabNav'
import HeadNav from '../components/HeadNav'
export default class RankingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starNumber:1
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeadNav header="排行榜"  onPress={() => navigate('Home')} />
                <RankingTabNav navigation={this.props.navigation}/>
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

