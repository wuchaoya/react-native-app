import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import TimerButton from '../components/test'
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5,
            phoneNumber:'aaaa'
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
            phoneNumber
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TimerButton
                    style={{width: screenWidth*0.2,marginRight: 10}}
                    timerCount={60}
                    disableColor="#aaa"
                    buttonDisabledColor="#ccc"
                    selfEnable={false}
                    textStyle={{color: '#fff'}}
                    onClick={(start)=>{
                        ()=>{
                            console.log(start)
                        }
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        justifyContent:'center',
        alignItems:'center'
    },
});