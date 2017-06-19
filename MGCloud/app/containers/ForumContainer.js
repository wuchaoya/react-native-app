/**
 * 论坛页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import ComStyle from '../style/CommonStyle'
import Head from '../components/Head'
export default class ForumContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Head title="论坛"/>
                <Image style={{height:170,width:385}} source={require('../static/img/404_icon.png')} />
                <View style={[styles.container,{alignItems: 'center',}]}>
                    <Text style={styles.text}>敬请期待</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        height: 26,
        width: 26,
    },
    text:{
        marginTop:62,
        fontSize:18
    }
    
});

