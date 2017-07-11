/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component,PropTypes} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

export default  class TimerButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true,
        };
        this.shouldStartCountting = this.shouldStartCountting.bind(this)
        this.countDownAction = this.countDownAction.bind(this)
    }

    static propTypes = {
        style: PropTypes.object,
        textStyle: Text.propTypes.style,
        buttonColor:PropTypes.string,
        onClick: PropTypes.func,
        disableColor: PropTypes.string,
        buttonDisabledColor:PropTypes.string,
        timerTitle: PropTypes.string,
        enable: React.PropTypes.oneOfType([React.PropTypes.bool,React.PropTypes.number])
    };

    countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            } else {
                this.setState({
                    timerCount: timer,
                    timerTitle: `重新获取(${timer}s)`,
                })
            }
        }, 1000)
    }

    shouldStartCountting(shouldStart) {
        if (this.state.counting) {
            return
        }
        if (shouldStart) {
            this.countDownAction()
            this.setState({counting: true, selfEnable: false})
        } else {
            this.setState({selfEnable: true})
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        console.log(this.state.selfEnable+'selfenable')
        console.log(this.props.selfEnable)
        console.log(this.props)
        const {onClick, style, textStyle, disableColor,buttonDisabledColor} = this.props;
        const {counting, timerTitle, selfEnable} = this.state;
        return (
            <TouchableOpacity
                activeOpacity={counting ? 1 : 0.8} onPress={() => {
                if (!counting &&selfEnable) {
                    this.setState({selfEnable: false});
                  console.log(onClick)
                    onClick
                 this.shouldStartCountting(true)
                };}}
                style={[styles.styleCodeView,{backgroundColor: ((!counting && selfEnable) ? '#83b233' : buttonDisabledColor || 'gray')}]}>
                <Text
                    style={[{fontSize: 12}, textStyle, {color: ((!counting && selfEnable) ? textStyle.color : disableColor || 'gray')}]}>{timerTitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    styleCodeView: {
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:40,
        backgroundColor:'#83b233',
        borderRadius:6,
        alignSelf:'center',
        position:'absolute',
        right:0,
        alignSelf:'center'
    },
    styleTextCode: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },

});