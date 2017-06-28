/**
 * 登陆注册页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import LoginTab  from '../components/LoginTab'
import HeadNav from '../components/HeadNav'
import TransparentStatusBar from '../components/TransparentStatusBar'
import ColorStyle from '../style/ColorStyle'

export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TransparentStatusBar barStyle='dark-content'/>
                <HeadNav leftColor="#222" color={ColorStyle.loginTheme.backgroundColor} onPress={() => goBack()}/>
                <LoginTab navigation={this.props.navigation}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
});

