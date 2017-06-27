/**
 * 专题详情
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    ScrollView,
    StatusBar,
    ListView
} from 'react-native';
import HeadNav from '../components/HeadNav'
import Topic from '../components/Topic'
let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
const data = [
    {
        headImg: require('../static/img/topic1_head.png'),
        titleText: '辐射岛',
        gameClass: ['益智'],
        starNumber: 9,
        gameImg: require('../static/img/topic1.png'),
        summary: '孔乙己第一天'
    },
    {
        headImg: require('../static/img/topic1_head.png'),
        titleText: '辐射岛',
        gameClass: ['益智'],
        starNumber: 9,
        gameImg: require('../static/img/topic1.png'),
        summary: '孔乙己第一天'
    },
    {
        headImg: require('../static/img/topic1_head.png'),
        titleText: '辐射岛',
        gameClass: ['益智'],
        starNumber: 9,
        gameImg: require('../static/img/topic1.png'),
        summary: '孔乙己第一天'
    }
]

export default class TopicDetails extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
        };
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <HeadNav   onPress={() => goBack()} />
                <Image style={styles.headImg} resizeMode="cover"  source = {require('../static/img/4.jpg')}>
                    <View style={styles.headView}>
                        <Text style={[styles.headText,styles.fonSize_15,{marginBottom:18}]}>文案高考结束来玩大作</Text>
                        <Text style={[styles.headText,styles.fonSize_11]}>精品大作，够玩一个暑假</Text>
                    </View>
                </Image>
                <Topic data = {data}  navigation={this.props.navigation}/>
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        // paddingVertical: 20,
        backgroundColor:'#ededed'
    },
    headImg:{
        width:width,
        marginBottom:12,
    },
    headView:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.4)',
        flex:1
    },
    headText:{
        color:'#ffffff',
        opacity:1,
    },
    fonSize_15:{
        fontSize:16
    },
    fonSize_11:{
        fontSize:12
    }
});

